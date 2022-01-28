const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const {
  getNotifications,
  createNotification
} = require('../controllers/notifications');
const paginateNotifications = require('../middleware/paginate-notifications');
const auth = require('../middleware/auth');

router.use(auth);
router
  .route('/')
  .get(paginateNotifications, getNotifications)
  .post(createNotification);

module.exports = router;
