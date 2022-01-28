const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");

const createConversation = async (req, res) => {
	const newConversation = new Conversation({
		members: [req.body.senderId, req.body.receiverId],
	});
	const result = await newConversation.save();

	res.json(result);
};

const getConversations = async (req, res) => {
	const conversations = await Conversation.aggregate([
		{
			$match: {
				members: { $in: [mongoose.Types.ObjectId(req.params.userId)] },
			},
		},
		{
			$lookup: {
				from: "users",
				localField: "members",
				foreignField: "_id",
				as: "members",
			},
		},
		{
			$project: {
				members: {
					_id: 1,
					firstname: 1,
					lastname: 1,
					profileImage: 1,
					birthdate: 1,
				},
				createdAt: 1,
				updatedAt: 1,
			},
		},
		{
			$lookup: {
				from: "messages",
				let: {userid: "$_id" },
				pipeline: [
					{
						$match: {$expr: {$eq: ["$conversationId", "$$userid"]}} 
					},
					{ $sort: { createdAt: -1 } },
					{ $limit: 5 },
					{
						$lookup: {
							from: "users",
							let: {sender: "$sender"},
							pipeline: [
								{ $match: {$expr: {$eq: ["$_id", "$$sender"]}} },
								{ $project: {"_id": 1, "firstname": 1, "lastname": 1, "profileImage": 1}}
							],
							as: "sender"
						},
					}
				],
				as: "messages"
			}
		}
	]);

	res.json(conversations);
};

module.exports = {
	createConversation,
	getConversations,
};
