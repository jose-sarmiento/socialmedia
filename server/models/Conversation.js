const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		sender: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		text: {
			type: String,
			required: true
		},
		seenBy: [String],
		createdAt: { type: Date, default: Date.now },
	});

const conversationSchema = new mongoose.Schema(
	{
		members: [{type: mongoose.Types.ObjectId, ref: 'User'}],
		messages: [messageSchema],
		createdAt: { type: Date, default: Date.now },
	});

module.exports = mongoose.model("Conversation", conversationSchema);
