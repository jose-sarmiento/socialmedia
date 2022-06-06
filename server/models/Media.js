const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MediaSchema = Schema({ 
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true
  },
  name: String,
  createdAt: { type: Date, default: Date.now },
})

module.exports = MediaSchema