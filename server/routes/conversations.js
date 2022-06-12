const router = require("express").Router();
const auth = require("../middleware/auth");
const {
	getConversations,
	createConversation,
	getConversation,
	getMessagesInConversation,
	createMessage,
	readMessagesInConversation,
	readMessage,
	deleteMessage,
} = require("../controllers/conversations");

router.use(auth);
router.route("/").get(getConversations).post(createConversation);
router
	.route("/:conversationId")
	.get(getConversation)
	.patch(readMessagesInConversation);
router
	.route("/:conversationId/messages")
	.get(getMessagesInConversation)
	.post(createMessage);
router
	.route("/:conversationId/messages/:messageId")
	.patch(readMessage)
	.delete(deleteMessage);

module.exports = router;
