require('dotenv').config();
require('express-async-errors');

const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const morgan = require('morgan');
const schedule = require('node-schedule');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const users = require('./routes/users');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const conversations = require('./routes/conversations');
const notifications = require('./routes/notifications');
const { getBirthdays } = require('./controllers/users');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

app.use(
  cors({
    origin: 'http://localhost:3000',
    exposedHeaders: 'x-auth-token',
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);
app.use('/api/v1/conversations', conversations);
app.use('/api/v1/notifications', notifications);

app.use(notFound);
app.use(errorHandler);

// add birthday notification evry midnight

schedule.scheduleJob('birthdayJob', '0 0 * * *', async () => {
  try {
    const birthdays = await getBirthdays();
    console.log(birthdays);
  } catch (err) {
    console.log(err);
  }
  schedule.cancelJob('birthdayJob');
});

const state = {
  users: [],
};

io.on('connection', (socket) => {
  socket.on('event://setup', (user) => {
    socket.join(user._id);
    const idx = state.users.findIndex((x) => x._id === user._id);
    if (idx === -1) {
      state.users.push({
        ...user,
        socketId: socket.id,
        status: 'online',
        lastOnline: new Date(),
      });
    } else {
      state.users[idx].socketId = socket.id;
      state.users[idx].status = 'online';
    }
    console.log(state.users);
    io.emit('event://get-users', state.users);
  });

  socket.on('event://open-chat', (room) => {
    socket.join(room);
  });

  socket.on('event://send-message', (payload) => {
    socket.broadcast.emit('event://receive-message', payload);
  });

  socket.on('event://send-new-chat', (payload) => {
    socket.join(payload.receiverId);
    socket.broadcast.emit('event://receive-new-chat', payload);
  });

  socket.on('event://typing', (name) => {
    socket.broadcast.emit('event://typing', name);
  });

  socket.on('event://stop-typing', () => {
    socket.broadcast.emit('event://stop-typing');
  });

  socket.on(
    'event://send-friend-request',
    ({ notification, friendRequest }) => {
      const receiver = state.users.find((x) => x._id === notification.to);
      if (receiver) {
        io.to(receiver.socketId).emit('event://receive-friend-request', {
          notification,
          friendRequest,
        });
      }
    }
  );

  socket.on('event://accept-friend-request', ({ notification, friend }) => {
    const receiver = state.users.find((x) => x._id === notification.to);
    if (receiver) {
      io.to(receiver.socketId).emit('event://receive-accept-friend-request', {
        notification,
        friend,
      });
    }
  });

  socket.on('event://disconnect', () => {
    console.log('disconnect');
    const idx = state.users.findIndex((x) => x.socketId === socket.id);
    if (idx !== -1) {
      state.users[idx].status = 'offline';
      state.users[idx].lastOnline = new Date();
      io.emit('event://get-users', state.users);
      console.log(state.users);
    }
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    const idx = state.users.findIndex((x) => x.socketId === socket.id);
    if (idx !== -1) {
      state.users[idx].status = 'offline';
      state.users[idx].lastOnline = new Date();
      io.emit('event://get-users', state.users);
      console.log(state.users);
    }
  });
});

const port = process.env.PORT || 8000;
const start = async () => {
  try {
    await connectDB();
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
