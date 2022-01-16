const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const Schema = mongoose.Schema

const ReplySchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  userProfileImage: {
    type: String,
    required: true
  },
  reply: {
    type: String,
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    min: 0,
    default: 0
  },
  reactions: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      reaction: {
        type: String,
        enum: ['like', 'laugh', 'love', 'angry', 'wow'],
        required: true
      },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
})

const CommentSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true
  },
  userProfileImage: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true,
  },
  meta: {
    likes: {
      type: Number, 
      min: 0, 
      default: 0
    },
    replies: {
      type: Number, 
      min: 0, 
      default: 0
    }
  },
  reactions: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      reaction: {
        type: String,
        enum: ['like', 'laugh', 'love', 'angry', 'wow'],
      },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
  replies: [ReplySchema],
  createdAt: { type: Date, default: Date.now() },
})

const validateComment = (body) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
  })
  return schema.validate(body)
}

const validateReply = (body) => {
  const schema = Joi.object({
    reply: Joi.string().required(),
  })
  return schema.validate(body)
}

module.exports = {
  CommentSchema,
  validateComment,
  validateReply,
}