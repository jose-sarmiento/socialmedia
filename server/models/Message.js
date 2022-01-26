const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: mongoose.Types.ObjectId,
			required: true
		},
		sender: {
			type: mongoose.Types.ObjectId,
			required: true,
			ref: 'User'
		},
		text: {
			type: String,
			required: true
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
