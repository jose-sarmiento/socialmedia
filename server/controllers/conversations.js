const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const { NotFound, BadRequest } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getConversations = async (req, res) => {
	const conversations = await Conversation.find({
		members: req.user._id,
	})
		.populate("members", "firstname lastname profileImage")
		.populate("messages.sender", "firstname lastname profileImage");

	res.json({ conversations });
};

const createConversation = async (req, res) => {
	const alreadyExists = await Conversation.findOne({ members: [req.user._id, req.body.receiverId] })

	if(alreadyExists) throw new BadRequest("Conversation already exists");

	const newConversation = new Conversation({
		members: [req.user._id, req.body.receiverId],
	});
	let conversation = await newConversation.save();
	consversation = await Conversation.populate(conversation, {
		path: "members",
		select: "firstname lastname profileImage",
	});

	res.json(consversation);
};

const getConversation = async (req, res) => {
	const conversation = await Conversation.findById(
		req.params.conversationId
	).populate("members", "firstname lastname profileImage");

	res.json({ conversation: conversation });
};

const getMessagesInConversation = async (req, res) => {
	res.json({ messages: [] });
};

const createMessage = async (req, res) => {
	let conversation = await Conversation.findById(req.params.conversationId);

	if (!conversation) {
		throw new NotFound("Conversation not found");
	}

	const messageId = new mongoose.Types.ObjectId();

	conversation.messages.push({
		_id: messageId,
		sender: req.user._id,
		text: req.body.text,
		seenBy: [req.user._id],
	});

	conversation = await conversation.save();
	const message = conversation.messages.id(messageId);

	res.status(StatusCodes.CREATED).json({
		conversationId: conversation._id,
		message: message,
	});
};

const readMessagesInConversation = async (req, res) => {
	const conversation = await Conversation.findOneAndUpdate(
		{
			_id: req.params.conversationId,
			messages: { $elemMatch: { seenBy: {$ne: req.user._id} } } 
		},
		{
			$addToSet: {
				"messages.$.seenBy": req.user._id,
			}
		},{new: true}
	);

	res.json({ updated: true, messages: conversation.messages });
};

const readMessage = async (req, res) => {
	const conversation = await Conversation.findOneAndUpdate(
		{
			_id: req.params.conversationId,
			messages: { $elemMatch: { _id: req.params.messageId } } 
		},
		{
			$addToSet: {
				"messages.$.seenBy": req.user._id,
			}
		},{new: true}
	);

	res.json({ updated: true, messages: conversation.messages });
};

const deleteMessage = async (req, res) => {
	let conversation = await Conversation.findById(req.params.conversationId);
	conversation.messages.id(req.params.messageId).remove();
	await conversation.save();

	res.json({ deleted: true });
};

const getMessages = async (req, res) => {
	const messages = await Message.find({
		conversationId: req.params.conversationId,
	}).populate("sender", "firstname lastname profileImage");
	res.json(messages);
};

module.exports = {
	getConversations,
	createConversation,
	getConversation,
	getMessagesInConversation,
	createMessage,
	readMessagesInConversation,
	readMessage,
	deleteMessage,
	getMessages,
};
