const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const sharp = require("sharp");
const { Post, validatePost } = require("../models/Post");
const { NotFound, BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getPosts = async (req, res) => {
	res.json(res.paginatedResults);
};

const getPost = async (req, res) => {
	const post = await Post.findById(req.params.id).populate(
		"author",
		"firstname lastname profileImage"
	);
	if (!post) {
		throw new NotFound("Post not found");
	}
	res.status(StatusCodes.OK).json(post);
};

const createPost = async (req, res) => {
	const {
		body: { body: text, title },
		files,
	} = req;
	req.body.author = req.user._id.toString();

	const { error } = validatePost(req.body);
	if (error) throw new BadRequest(error.details[0].message);

	const reqBody = {};
	if (text) {
		reqBody.body = text;
	}

	if (title) {
		reqBody.title = title;
	}

	if (files) {
		reqBody.multimedia = await Promise.all(
			files.map(async (file) => {
				const type = file.mimetype.split("/")[0];
				let thumbnail;
				if (type === "image") {
					thumbnail = await generateThumb(file);
				} else {
					thumbnail = createThumbFromVideo(file);
				}

				return {
					type,
					path: `${protocol}://${host}:${port}/uploads/${file.filename}`,
					thumbnail: `${protocol}://${host}:${port}/uploads/${thumbnail}`,
					name: file.originalname,
				};
			})
		);
		reqBody.photos = reqBody.multimedia
			.filter((media) => media.type === "image")
			.map((media) => ({
				name: media.name,
				path: media.path,
				thumbnail: media.thumbnail,
			}));
	}

	const post = await Post.create({ author: req.user._id, ...reqBody });
	res.status(StatusCodes.CREATED).json(post);
};

const getNewPosts = async (req, res, next) => {
	if (!req.body.date) throw new BadRequest("Date is required");
	const posts = await Post.find({
		createdAt: {
			$gte: req.body.date,
			$lt: "2013-11-19T20:00:00Z",
		},
	});
	res.status(StatusCodes.OK).json(posts);
};

const updatePost = async (req, res) => {
	const {
		user,
		params: { id },
	} = req;
	const post = await Post.findOneAndUpdate(
		{ _id: id, author: user._id },
		req.body,
		{ new: true, runValidators: true }
	);
	if (!post) throw new NotFound("No Post Found with given id");

	res.status(StatusCodes.OK).send({ post, updated: true });
};

const deletePost = async (req, res) => {
	const result = await Post.deleteOne({ _id: req.params.id });
	res.status(StatusCodes.OK).send({
		...result,
		deleted: result.deletedCount === 0 ? "false" : "true",
	});
};

const reactPost = async (req, res) => {
	let post = await Post.findById({ _id: req.params.id });
	if (!post) throw new NotFound("Post not found with the given id");

	const alreadyReact = await Post.findOne({
		_id: req.params.id,
		"reactions.userId": req.user._id,
	});

	let result;
	if (alreadyReact) {
		result = await Post.findOneAndUpdate(
			{
				_id: req.params.id,
				reactions: {
					$elemMatch: { userId: req.user._id },
				},
			},
			{
				$set: { "reactions.$.reaction": req.body.reaction },
			},
			{ new: true }
		);
	} else {
		result = await Post.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$push: {
					reactions: {
						userId: req.user._id,
						userName: req.user.firstname,
						reaction: req.body.reaction,
					},
				},
				$inc: { "meta.likes": 1 },
			},
			{ new: true }
		);
	}

	res.status(StatusCodes.OK).json({ result, created: true });
};

async function generateThumb(file) {
	const [name, ext] = file.filename.split(".");
	const thumbname = name + "-thumb." + ext;
	await sharp(file.path, { failOnError: false })
		.resize({ width: 500, fit: "contain" })
		.withMetadata()
		.toFile(path.resolve(file.destination, thumbname));
	return thumbname;
}

function createThumbFromVideo(video) {
	let newFilename = "";
	const filename = video.filename.split(".")[0];
	const thumbnailName = "public/uploads/" + filename + "-thumb.png";

	ffmpeg({ source: video.path })
		.on("filenames", (filenames) => {
			newFilename = filenames[0].replace("public/uploads/", "");
		})
		.takeScreenshots(
			{
				filename: thumbnailName,
				timemarks: [2],
			},
			"."
		);
	return newFilename;
}

module.exports = {
	getPosts,
	getPost,
	getNewPosts,
	createPost,
	updatePost,
	deletePost,
	reactPost,
	generateThumb
};

