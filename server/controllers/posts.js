const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const sharp = require('sharp');
const { StatusCodes } = require('http-status-codes');
const { Post, validatePost } = require('../models/Post');
const { NotFound, BadRequest } = require('../errors');

const getPosts = async (req, res) => {
	res.json(res.paginatedResults);
};

const getPost = async (req, res) => {
	const post = await Post.findById(req.params.id)
		.populate('author', 'firstname lastname username profileImage')
		.populate({
             path: 'sharedPost',
             populate: {
                path: 'author',
                select: 'firstname lastname username profileImage'
             }
          });
	if (!post) {
		throw new NotFound('Post not found');
	}
	res.status(StatusCodes.OK).json(post);
};

async function generateThumb(file) {
	const [name, ext] = file.filename.split('.');
	const thumbname = `${name}-thumb.${ext}`;
	await sharp(file.path, { failOnError: false })
		.resize({ width: 500, fit: 'contain' })
		.withMetadata()
		.toFile(path.resolve(file.destination, thumbname));
	return thumbname;
}

function createThumbFromVideo(video) {
	let newFilename = '';
	const filename = video.filename.split('.')[0];
	const thumbnailName = `uploads/${filename}-thumb.png`;

	ffmpeg({ source: video.path })
		.on('filenames', (filenames) => {
			newFilename = filenames[0].replace('uploads/', '');
		})
		.takeScreenshots(
			{
				filename: thumbnailName,
				timemarks: [2],
			},
			'.'
		);
	return newFilename;
}

const createPost = async (req, res) => {
	const {
		body: { body: text },
		files,
	} = req;
	req.body.author = req.user._id.toString();

	if (!req.body.body && !req.files) {
		throw new BadRequest('Post body or image is required');
	}

	const { error } = validatePost(req.body);
	if (error) throw new BadRequest(error.details[0].message);

	const reqBody = {};
	if (text) {
		reqBody.body = text;
	}

	if (files) {
		reqBody.multimedia = await Promise.all(
			files.map(async (file) => {
				const type = file.mimetype.split('/')[0];
				let thumbnail;
				if (type === 'image') {
					thumbnail = await generateThumb(file);
				} else {
					thumbnail = createThumbFromVideo(file);
				}

				return {
					type,
					path: file.filename,
					thumbnail,
					name: file.originalname,
				};
			})
		);
		reqBody.photos = reqBody.multimedia
			.filter((media) => media.type === 'image')
			.map((media) => ({
				name: media.name,
				path: media.path,
				thumbnail: media.thumbnail,
			}));
	}

	let post = await Post.create({ author: req.user._id, ...reqBody });
	post = await Post.populate(post, {
		path: 'author sharedPost',
		select: 'firstname lastname profileImage username',
	});
	res.status(StatusCodes.CREATED).json(post);
};

const sharePost = async (req, res) => {
	let post = await Post.create({
		author: req.user._id,
		shared: true,
		sharedPost: req.params.id,
		...req.body,
	});

	const original = await Post.findById(req.params.id);
	original.rePosters.push(req.user._id);
	original.meta.shares += 1;
	await original.save();

	post = await Post.findById(post._id)
		.populate('author', 'firstname lastname username profileImage')
		.populate({
			path: 'sharedPost',
			populate: {
				path: 'author',
				select: 'firstname lastname username profileImage',
			},
		});
	res.status(StatusCodes.CREATED).json(post);
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
	if (!post) throw new NotFound('No Post Found with given id');

	res.status(StatusCodes.OK).send({ post, updated: true });
};

const deletePost = async (req, res) => {
	const post = await Post.findOneAndDelete({ _id: req.params.id });

	if (post.shared) {
		await Post.updateOne(
			{ _id: post.sharedPost },
			{
				$inc: { 'meta.shares': -1 },
				$pull: { rePosters: req.user._id },
			}
		);
	}

	res.status(StatusCodes.OK).send({
		deletedPost: post,
	});
};

const likePost = async (req, res) => {
	const post = await Post.findById({ _id: req.params.id });
	if (!post) throw new NotFound('Post not found with the given id');

	const reactor = post.reactors.findIndex((x) => x.equals(req.user._id));

	if (reactor < 0) {
		post.reactors.push(req.user._id);
		post.meta.likes += 1;
		await post.save();
		return res.status(StatusCodes.OK).json({
			created: true,
			message: 'Successfully like the post',
		});
	}

	post.reactors.pull(req.user._id);
	post.meta.likes -= 1;
	await post.save();
	return res.status(StatusCodes.OK).json({
		deleted: true,
		message: 'Successfully unlike the post',
	});
};

module.exports = {
	getPosts,
	getPost,
	createPost,
	sharePost,
	updatePost,
	deletePost,
	likePost,
	generateThumb,
};
