const { BadRequest } = require('../errors')
const Notification = require('../models/Notification')

const getNotifications = async (req, res) => {
  res.json(req.paginatedResults)}

const createNotification = async (req, res) => {
  console.log(req.body.to)
  let notif = new Notification({
    from: {
      _id: req.user._id,
      fullname: `${req.user.firstname} ${req.user.lastname}`,
      image: req.user.profileImage
    },
    to: {
      _id: req.body.to._id,
      fullname: `${req.body.to.fullname}`,
      image: req.body.to.image
    },
    type: req.body.type
  })
  notif = await notif.save()
  res.json(notif)
}

module.exports = {
  getNotifications,
  createNotification
}