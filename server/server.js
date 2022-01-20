require('dotenv').config();
require('express-async-errors');

const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const users = require('./routes/users');
const posts = require('./routes/posts');
const auth = require('./routes/auth');
const photos = require('./data/photos');

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		exposedHeaders: 'x-auth-token',
	})
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/posts', posts);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;
const start = async () => {
	try {
		console.log(process.env.DATABASE_URI)
		await connectDB(process.env.DATABASE_URI);
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
