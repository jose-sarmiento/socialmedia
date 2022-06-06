const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const {
  getNotifications,
  createNotification,
  updateNotification,
  readAllNotifications
} = require('../controllers/notifications');
const auth = require('../middleware/auth');

router.use(auth);
router
  .route('/')
  .get(getNotifications)
  .post(createNotification)
router.route('/readall')
  .patch(readAllNotifications);
router
  .route("/:notificationId")
  .patch(updateNotification);

module.exports = router;
