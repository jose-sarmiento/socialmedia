const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require("./data/users");
const posts = require("./data/posts");
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const connectDB = require("./db/connect");

dotenv.config();


const importData = async () => {
  try {
  await connectDB(process.env.DATABASE_URI);
    await User.deleteMany({});
    await Post.deleteMany({});

    const createdUsers = await User.insertMany(
      users.map((user) => {
        const [firstname, lastname] = user.name.split(" ");
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
          photos: [],
        };
      })
    );

    const postsWithAuthor = posts.map((post) => ({
      ...post,
      author: createdUsers[Math.floor(Math.random() * 50)]._id,
    }));

    const createdPosts = await Post.insertMany(postsWithAuthor);

    const authors = [...new Set(createdPosts.map((post) => post.author._id))];


    const getImagesByAuthor = (author) => {
      const postsByAuthor = createdPosts.filter(post => post.author == author);
      
      let imagesContainer = [];
      postsByAuthor.forEach((post) => {
        imagesContainer = [...imagesContainer, ...post.multimedia];
      });

      return imagesContainer
    }

    const addPhotos = async (author, images) => {
      const res = await User.findOneAndUpdate(
        {_id: author}, 
        { $push: { photos: images } },
        {new: true}
      )
    }


    const insert = async (x) => {
      const images = getImagesByAuthor(x)
      await addPhotos(x, images)
    }

    await insert(authors[0])
    await insert(authors[1])
    await insert(authors[2])
    await insert(authors[3])
    await insert(authors[4])
    await insert(authors[5])
    await insert(authors[6])
    await insert(authors[7])
    await insert(authors[8])
    await insert(authors[9])
    await insert(authors[10])
    await insert(authors[11])
    await insert(authors[12])
    await insert(authors[13])
    await insert(authors[14])
    await insert(authors[15])
    await insert(authors[16])
    await insert(authors[17])
    await insert(authors[18])
    await insert(authors[19])
    await insert(authors[20])
    await insert(authors[21])
    await insert(authors[22])
    await insert(authors[23])
    await insert(authors[24])
    await insert(authors[25])
    await insert(authors[26])
    await insert(authors[27])
    await insert(authors[28])
    await insert(authors[29])
    await insert(authors[30])
    await insert(authors[31])
    await insert(authors[32])
    await insert(authors[33])
    await insert(authors[34])
    await insert(authors[35])
    await insert(authors[36])
    await insert(authors[37])
    await insert(authors[38])
    await insert(authors[39])
    await insert(authors[40])
    await insert(authors[41])
    await insert(authors[42])
    await insert(authors[43])
    await insert(authors[44])
    await insert(authors[45])
    await insert(authors[46])
    await insert(authors[47])
    await insert(authors[48])
    await insert(authors[49])
    await insert(authors[50])

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

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
