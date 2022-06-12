const Notification = require('../models/Notification');

const getNotifications = async (req, res) => {
  const notifications = await Notification.find({ to: req.user._id });
  res.json(notifications);
};

const createNotification = async (req, res) => {
  let notif = new Notification({
    to: req.body.to,
    type: req.body.type,
  });

  if (req.body.from) {
    notif.from = req.body.from;
  }
  notif = await notif.save();
  res.json(notif);
};

const updateNotification = async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    {
      _id: req.params.notificationId,
    },
    req.body,
    { new: true }
  );

  res.json(notification);
};

const readAllNotifications = async (req, res) => {
  await Notification.updateMany(
    {
      to: req.user._id,
    },
    {
      $set: {
        isRead: true,
      },
    }
  );

  res.json({ success: true, message: 'Successfully masked as read' });
};

module.exports = {
  getNotifications,
  createNotification,
  updateNotification,
  readAllNotifications,
};
