const router = require('express').Router()
const auth = require("../middleware/auth");
const { createConversation, getConversations } = require('../controllers/conversations')

// router.use(auth)
router.route('/').post(createConversation)
router.route('/:userId').get(getConversations)

module.exports = router