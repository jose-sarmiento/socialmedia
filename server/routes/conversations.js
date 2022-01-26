const router = require('express').Router()
const { createConversation, getConversations } = require('../controllers/conversations')

router.route('/').post(createConversation)
router.route('/:userId').get(getConversations)

module.exports = router