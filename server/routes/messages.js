const router = require('express').Router()
const auth = require("../middleware/auth");
const {createMessage, getMessages} = require('../controllers/messages')

// router.use(auth)
router.route('/').post(createMessage)
router.route('/:conversationId').get(getMessages)

module.exports = router