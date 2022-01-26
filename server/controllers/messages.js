const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

const createMessage = async (req, res) => {
	let newConversation;
	if (req.body.conversationId === null) {
		const convoInstance = new Conversation({
			members: [req.body.sender, req.body.receiverId],
		});
		newConversation = await convoInstance.save();
	}

	let newMessage;
	if (newConversation) {
		newMessage = new Message({
			conversationId: newConversation._id,
			sender: req.body.sender,
			text: req.body.text,
		});

		newConversation = await Conversation.findOne({
			_id: newConversation._id,
		}).populate("members", "firstname lastname profileImage");
	} else {
		newMessage = new Message(req.body);
	}

	let result = await newMessage.save();
	result = await Message.findOne({
		_id: result._id,
	}).populate("sender", "firstname lastname profileImage");

	res.json({
		message: result,
		createdConversation: newConversation ? newConversation : null,
	});
};

const getMessages = async (req, res) => {
	const messages = await Message.find({
		conversationId: req.params.conversationId,
	}).populate("sender", "firstname lastname profileImage");
	res.json(messages);
};

module.exports = {
	createMessage,
	getMessages,
};
