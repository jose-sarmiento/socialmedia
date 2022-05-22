const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const MediaSchema = require('./Media')
const { CommentSchema } = require('./Comment')

const PostSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	body: {
		type: String,
		trim: true,
		required: true
	},
	multimedia: [MediaSchema],
	comments: [CommentSchema],
	reactors: [{ type: Schema.Types.ObjectId, required: true }],
	meta: {
		likes: { type: Number, min: 0, default: 0 },
		shares: { type: Number, min: 0, default: 0 },
		comments: { type: Number, min: 0, default: 0 }
	}
})

const Post = mongoose.model('Post', PostSchema)

const validatePost = (body) => {
	const schema = Joi.object({
		author: Joi.objectId().required(),
		body: Joi.string().min(1),
		multimedia: Joi.array().min(1)
	}).min(1)
	return schema.validate(body)
}

module.exports = { Post, validatePost }
