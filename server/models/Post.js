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
	title: {
		type: String,
		trim: true,
	}, 
	body: {
		type: String,
		trim: true
	},
	multimedia: [ MediaSchema ],
	comments: [ CommentSchema ],
	meta: {
		likes: { type: Number, min: 0, default: 0 },
		shares: { type: Number, min: 0, default: 0 },
		comments: { type: Number, min: 0, default: 0 }
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
				enum: [ 'like', 'laugh', 'love', 'angry', 'wow' ]
			},
			createdAt: { type: Date, default: Date.now() }
		}
	],
	createdAt: { type: Date, default: Date.now }
})

const Post = mongoose.model('Post', PostSchema)

const validatePost = (body) => {
	const schema = Joi.object({
		author: Joi.objectId().required(),
		title: Joi.string().min(1),
		body: Joi.string().min(1),
		multimedia: Joi.array().min(1)
	}).min(1)
	return schema.validate(body)
}

module.exports = { Post, validatePost }
