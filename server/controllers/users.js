const { User } = require("../models/User");
const { Friend } = require("../models/Friend");
const { BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const { generateThumb } = require("./posts");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
	const people = await User.aggregate([
		{ $match: { friends: { $exists: true } } },
		{
			$lookup: {
				from: "friends",
				localField: "friends",
				foreignField: "_id",
				as: "userFriends",
			},
		},
		{
			$match: {
				"userFriends.requester": {
					$ne: mongoose.Types.ObjectId(req.user._id),
				},
				"userFriends.recipient": {
					$ne: mongoose.Types.ObjectId(req.user._id),
				},
			},
		},
		{ $project: { firstname: 1, lastname: 1, profileImage: 1 } },
	]);
	res.send(people);
};

const getUser = async (req, res) => {
	const user = await User.aggregate([
		{ $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
		// { $project: { password: 0 } },
		{
			$lookup: {
				from: "friends",
				pipeline: [
					{
						$match: {
							$expr: {
								$eq: [
									"$requester",
									mongoose.Types.ObjectId(req.params.id),
								],
							},
						},
					},
					{
						$lookup: {
							from: "users",
							let: { recipientId: "$recipient" },
							pipeline: [
								{
									$match: {
										$expr: {
											$eq: ["$_id", "$$recipientId"],
										},
									},
								},
								{
									$project: {
										firstname: 1,
										lastname: 1,
										profileImage: 1,
									},
								},
							],
							as: "recipientInfo",
						},
					},
					{ $unwind: "$recipientInfo" },
				],
				as: "userFriends",
			},
		},
	]);
	// if (!user) throw new NotFound('User not found');

	res.json({ ...user[0] });
};

const updateUser = async (req, res) => {
	console.log(req.body);
	const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
		fields: { password: 0, friends: 0 },
		new: true,
		runValidators: true,
	});
	if (!user) throw new NotFound("No User Found with given id");
	res.send({ user });
};

const deleteUser = async (req, res) => {
	const result = await User.deleteOne({ _id: req.params.id });
	res.send({
		...result,
		status: result.deletedCount === 0 ? "fail" : "success",
	});
};

const getUserPosts = async (req, res) => {
	res.json(res.paginatedResults);
};

const uploadCover = async (req, res) => {
	const protocol = req.protocol;
	const host = req.hostname;
	const url = req.file.path;
	const port = process.env.PORT || 8000;

	if (!req.file) throw new BadRequest("Please provide an image");

	const thumbnail = await generateThumb(req.file);

	const photoObj = {
		path: `${protocol}://${host}:${port}/uploads/${req.file.filename}`,
		name: req.file.originalname,
		thumbnail: `${protocol}://${host}:${port}/uploads/${thumbnail}`,
	}

	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$set: { coverImage: photoObj.path },
			$push: { photos: photoObj },
		},
		{ new: true }
	);
	res.json({ user, success: true });
};

const uploadProfile = async (req, res) => {
	const protocol = req.protocol;
	const host = req.hostname;
	const url = req.file.path;
	const port = process.env.PORT || 8000;

	if (!req.file) throw new BadRequest("Please provide an image");

	const thumbnail = await generateThumb(req.file);

	const photoObj = {
		path: `${protocol}://${host}:${port}/uploads/${req.file.filename}`,
		name: req.file.originalname,
		thumbnail: `${protocol}://${host}:${port}/uploads/${thumbnail}`,
	}

	const user = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ 
			$set: { profileImage: photoObj.path },
			$push: { photos: photoObj }
		},
		{ new: true }
	);

	res.json({ user });
};

const getFriends = async (req, res) => {
	const friends = await User.aggregate([
		{ $match: { _id: mongoose.Types.ObjectId(req.params.userId) } },
		{ $project: { friends: 1 } },
		{
			$lookup: {
				from: "friends",
				pipeline: [
					{
						$match: {
							$expr: {
								$eq: [
									"$requester",
									mongoose.Types.ObjectId(req.params.userId),
								],
							},
						},
					},
					{
						$lookup: {
							from: "users",
							let: { recipientId: "$recipient" },
							pipeline: [
								{
									$match: {
										$expr: {
											$eq: ["$_id", "$$recipientId"],
										},
									},
								},
								{
									$project: {
										firstname: 1,
										lastname: 1,
										profileImage: 1,
									},
								},
							],
							as: "recipientInfo",
						},
					},
					{ $unwind: "$recipientInfo" },
				],
				as: "userFriends",
			},
		},
		{ $project: { _id: 0, userFriends: 1 } },
	]);

	res.send({
		friends: friends[0].userFriends.map((friend) => ({
			status: friend.status,
			createdAt: friend.createdAt,
			...friend.recipientInfo,
		})),
	});
};

const addNewFriend = async (req, res) => {
	const requester = await Friend.findOneAndUpdate(
		{ requester: req.user._id, recipient: req.params.userId },
		{ $set: { status: 1 } },
		{ upsert: true, new: true }
	);
	const recipient = await Friend.findOneAndUpdate(
		{ recipient: req.user._id, requester: req.params.userId },
		{ $set: { status: 2 } },
		{ upsert: true, new: true }
	);
	const updateRequesterUser = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $push: { friends: requester._id } }
	);
	const updateRecipientUser = await User.findOneAndUpdate(
		{ _id: req.params.userId },
		{ $push: { friends: recipient._id } }
	);

	res.json({
		requester: updateRequesterUser,
		recipient: updateRecipientUser,
	});
};

const acceptRequest = async (req, res) => {
	const requester = await Friend.findOneAndUpdate(
		{ requester: req.user._id, recipient: req.params.userId },
		{ $set: { status: 3 } },
		{ new: true }
	);
	const recipient = await Friend.findOneAndUpdate(
		{ recipient: req.user._id, requester: req.params.userId },
		{ $set: { status: 3 } },
		{ new: true }
	);

	res.json({
		requester: {
			_id: requester._id,
			firstname: requester.firstname,
			lastname: requester.lastname,
			profileImage: requester.profileImage,
		},
		recipient: {
			_id: recipient._id,
			firstname: recipient.firstname,
			lastname: recipient.lastname,
			profileImage: recipient.profileImage,
		},
	});
};

const deleteRequest = async (req, res) => {
	let requester = await Friend.findOneAndRemove({
		requester: req.user._id,
		recipient: req.params.userId,
	});
	let recipient = await Friend.findOneAndRemove({
		recipient: req.user._id,
		requester: req.params.userId,
	});
	requester = await User.findOneAndUpdate(
		{ _id: req.user._id },
		{ $pull: { friends: requester._id } }
	);
	recipient = await User.findOneAndUpdate(
		{ _id: req.params.userId },
		{ $pull: { friends: recipient._id } }
	);

	res.json({
		requester: {
			_id: requester._id,
			firstname: requester.firstname,
			lastname: requester.lastname,
			profileImage: requester.profileImage,
		},
		recipient: {
			_id: recipient._id,
			firstname: recipient.firstname,
			lastname: recipient.lastname,
			profileImage: recipient.profileImage,
		},
	});
};

module.exports = {
	getUsers,
	getUser,
	deleteUser,
	updateUser,
	getUserPosts,
	uploadCover,
	uploadProfile,
	getFriends,
	addNewFriend,
	acceptRequest,
	deleteRequest,
};
