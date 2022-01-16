const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const posts = require('./data/posts');
const { User } = require('./models/User');
const { Post } = require('./models/Post');
const connectDB = require('./db/connect');

dotenv.config();

connectDB(process.env.DATABASE_URI);

const importData = async () => {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});

    const createdUsers = await User.insertMany(
      users.map(user => {
        const [firstname, lastname] = user.name.split(' ');
        return {
          _id: user._id,
          firstname,
          lastname,
          phone: user.phone,
          email: user.email,
          address: user.address,
          sex: user.sex,
          birthdate: user.birthdate,
          bio: user.bio,
          password: user.password,
          status: user.status,
        };
      })
    );

    const postsWithAuthor = posts.map(post => ({
      ...post,
      author: createdUsers[Math.floor(Math.random() * 50)],
    }));
    const createdPosts = await Post.insertMany(postsWithAuthor);

    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany({});
    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
