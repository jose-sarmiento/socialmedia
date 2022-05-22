const { faker } = require('@faker-js/faker');
const dotenv = require("dotenv");
const users = require("./data/users");
const posts = require("./data/posts");
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const connectDB = require("./db/connect");

dotenv.config();

function generateRandom(min, max) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}

function getReactors(reactorsCount) {
    const uniqueArr = [];
    const uniqueReactors = [];

    while (uniqueArr.length !== reactorsCount) {
        let n = generateRandom(0, 50);
        if (uniqueArr.includes(n)) {
            continue;
        }
        uniqueArr.push(n)
    }

    uniqueArr.forEach((x) => {
        uniqueReactors.push(users[x]._id)
    })

    return uniqueReactors;
}

const getReactorsFromUsers = () => {
    const reactorsCount = generateRandom(20, 50)
    const uniqueReactors = getReactors(reactorsCount);
    return uniqueReactors;
}


const importData = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        await User.deleteMany({});
        await Post.deleteMany({});

        const mockUsers = users.map((user) => {
            const [firstname, lastname] = user.name.split(" ");
            return {
                ...user,
                username: `${firstname}_${lastname}`,
                firstname,
                lastname,
                photos: [],
                profileImage: user.profileImage ? user.profileImage : faker.image.avatar()
            };
        })

        // insert users in db
        const createdUsers = await User.insertMany(mockUsers);

        for (let index = 0; index < posts.length; index++) {
            let newPost = new Post();
            newPost._id = posts[index]._id;
            newPost.body = posts[index].body;
            newPost.multimedia = posts[index].multimedia;
            newPost.author = createdUsers[Math.floor(Math.random() * 50)]._id;

            // add reactors
            let reactors = getReactorsFromUsers();

            newPost.reactors = reactors;
            newPost.meta.likes = reactors.length;

            // add comments
            const comments = [...Array(20).keys()].map((idx) => {
                const number = generateRandom(0, 50);
         
                return {
                    userId: mockUsers[number]._id,
                    userName: mockUsers[number].name,
                    username: mockUsers[number].username,
                    userProfileImage: mockUsers[number].profileImage,
                    comment: faker.lorem.words(),
                }
            });

            newPost.comments = comments;
            newPost.meta.comments = comments.length;

            newPost = await newPost.save();

            // add images in post to user
            const medias = newPost.multimedia;

            let user = await User.findById(newPost.author);
            for (let index = 0; index < medias.length; index++) {
                user.photos.push(medias[index]);
            }
            await user.save();
        }

        // const authors = [...new Set(createdPosts.map((post) => post.author._id))];


        // const getImagesByAuthor = (author) => {
        //     const postsByAuthor = createdPosts.filter(post => post.author == author);

        //     let imagesContainer = [];
        //     postsByAuthor.forEach((post) => {
        //         imagesContainer = [...imagesContainer, ...post.multimedia];
        //     });

        //     return imagesContainer
        // }

        // const addPhotos = async (author, images) => {
        //     const res = await User.findOneAndUpdate(
        //         { _id: author },
        //         { $push: { photos: images } },
        //         { new: true }
        //     )
        // }


        // const insert = async (x) => {
        //     const images = getImagesByAuthor(x)
        //     await addPhotos(x, images)
        // }

        // await insert(authors[0])
        // await insert(authors[1])
        // await insert(authors[2])
        // await insert(authors[3])
        // await insert(authors[4])

        // await insert(authors[5])
        // await insert(authors[6])
        // await insert(authors[7])
        // await insert(authors[8])
        // await insert(authors[9])
        // await insert(authors[10])
        // await insert(authors[11])
        // await insert(authors[12])
        // await insert(authors[13])
        // await insert(authors[14])
        // await insert(authors[15])
        // await insert(authors[16])
        // await insert(authors[17])
        // await insert(authors[18])
        // await insert(authors[19])
        // await insert(authors[20])
        // await insert(authors[21])
        // await insert(authors[22])
        // await insert(authors[23])
        // await insert(authors[24])
        // await insert(authors[25])
        // await insert(authors[26])
        // await insert(authors[27])
        // await insert(authors[28])
        // await insert(authors[29])
        // await insert(authors[30])
        // await insert(authors[31])
        // await insert(authors[32])
        // await insert(authors[33])
        // await insert(authors[34])
        // await insert(authors[35])
        // await insert(authors[36])
        // await insert(authors[37])
        // await insert(authors[38])
        // await insert(authors[39])
        // await insert(authors[40])
        // await insert(authors[41])
        // await insert(authors[42])
        // await insert(authors[43])
        // await insert(authors[44])
        // await insert(authors[45])
        // await insert(authors[46])
        // await insert(authors[47])
        // await insert(authors[48])
        // await insert(authors[49])
        // await insert(authors[50])

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
