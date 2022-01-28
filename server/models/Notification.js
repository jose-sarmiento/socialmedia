const mongoose = require('mongoose')
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  from: {
    _id: Schema.Types.ObjectId,
    fullname: String,
    image: String
  },
  to: {
    _id: Schema.Types.ObjectId,
    fullname: String,
    image: String
  },
  type: {
    type: String,
    required: true
  },
  read:  { type : Boolean, default : false }
}, {
  timestamps: true
})

module.exports = mongoose.model('Notification', notificationSchema)