/* eslint-disable no-await-in-loop */
const { faker } = require("@faker-js/faker");
const dotenv = require("dotenv");
const users = require("./data/users");
const posts = require("./data/posts");
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const { Friend } = require("./models/Friend");
const Notification = require("./models/Notification");
const Conversation = require("./models/Conversation");
const connectDB = require("./db/connect");

dotenv.config();

function generateRandom(min, max) {
  const difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand += min;
  return rand;
}

function getReactors(reactorsCount) {
  const uniqueArr = [];
  const uniqueReactors = [];

  while (uniqueArr.length !== reactorsCount) {
    const n = generateRandom(0, 50);
    if (uniqueArr.includes(n)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    uniqueArr.push(n);
  }

  uniqueArr.forEach((x) => {
    uniqueReactors.push(users[x]._id);
  });

  return uniqueReactors;
}

const getReactorsFromUsers = () => {
  const reactorsCount = generateRandom(20, 50);
  const uniqueReactors = getReactors(reactorsCount);
  return uniqueReactors;
};

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const importData = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    await User.deleteMany({});
    await Post.deleteMany({});
    await Friend.deleteMany({});
    await Notification.deleteMany({});
    await Conversation.deleteMany({});

    const mockUsers = users.map((user) => {
      const [firstname, lastname] = user.name.split(" ");
      return {
        ...user,
        username: `${firstname}_${lastname}`,
        firstname,
        lastname,
        photos: [],
        profileImage: user.profileImage
          ? user.profileImage
          : faker.image.avatar(),
        birthdate: randomDate(new Date(1997, 1, 1), new Date()),
      };
    });

    // insert users in db
    const createdUsers = await User.insertMany(mockUsers);

    for (let index = 0; index < posts.length; index += 1) {
      let newPost = new Post();
      newPost._id = posts[index]._id;
      newPost.body = posts[index].body;
      newPost.multimedia = posts[index].multimedia;
      newPost.author = createdUsers[Math.floor(Math.random() * 50)]._id;
      newPost.createdAt = randomDate(new Date(2022, 1, 1), new Date());

      // add reactors
      const reactors = getReactorsFromUsers();

      newPost.reactors = reactors;
      newPost.meta.likes = reactors.length;

      // add comments
      const comments = [...Array(20).keys()].map(() => {
        const number = generateRandom(0, 50);

        return {
          userId: mockUsers[number]._id,
          userName: mockUsers[number].name,
          username: mockUsers[number].username,
          userProfileImage: mockUsers[number].profileImage,
          comment: faker.lorem.words(),
          createdAt: randomDate(new Date(newPost.createdAt), new Date()),
        };
      });

      newPost.comments = comments;
      newPost.meta.comments = comments.length;

      newPost = await newPost.save();

      // add images in post to user
      const medias = newPost.multimedia;

      const user = await User.findById(newPost.author);
      for (let idx = 0; idx < medias.length; idx += 1) {
        user.photos.push(medias[idx]);
      }
      await user.save();
    }

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
