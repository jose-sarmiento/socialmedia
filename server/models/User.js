const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const photoSchema = new mongoose.Schema({
	path: String, 
	thumbnail: String, 
	name: String,
	createdAt: { type: Date, default: Date.now },
})

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		minLength: 2
	},
	lastname: {
		type: String,
		required: true,
		minLength: 2
	},
	username: String,
	middlename: String, 
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImage: {
		type: String,
		default: 'http://127.0.0.1:8000/profiles/defaultProfile.jpg'
	},
	coverImage: String,
	birthdate: {
		type: Date,
		required: true
	},
	sex: {
		type: String,
		enum: ['male', 'female'],
		required: true
	},
	address: String,
	status: {
		type: Number,
     	enums: [
         1,    //'single',
         2,    //'engaged',
         3,    //'married'
         4,    //'separated'
     ]
	},
	phone: String,
	school: {
		elementary: String,
		highschool: String,
		college: String,
	},
	bio: String,
	friends: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Friends'}],
	photos: [photoSchema],
	createdAt: { type: Date, default: Date.now },
})

userSchema.virtual('fullname')
	.get(function() {
		return this.firstname + ' ' + this.lastname
	})

userSchema.methods.generateToken = function() {
	return 	jwt.sign({_id: this._id}, process.env.JWT_SECRET)
}

userSchema.methods.verifyPassword = async function(password) {
	const isValid = await bcrypt.compare(password, this.password)
	return isValid
}

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

const validateUser = (body) => {
	const schema = Joi.object({
		firstname: Joi.string().min(2).max(30).required(),
		lastname: Joi.string().min(2).max(30).required(),
		middlename: Joi.string().min(2).max(30),
		email: Joi.string().required().email(),
		password: Joi.string().min(4).required(),
		birthdate: Joi.string().required(),
		sex: Joi.string().valid('male', 'female'),
		address: Joi.string()
	})

	return schema.validate(body)
}

const User = mongoose.model('User', userSchema)

module.exports.validateUser = validateUser
module.exports.User = User
module.exports.photoSchema = photoSchema