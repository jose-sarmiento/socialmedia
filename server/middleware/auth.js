const jwt = require('jsonwebtoken')
const { Unauthorized } = require('../errors')
const { User } = require('../models/User')

const auth = async (req, res, next) => {
	const bearerToken = req.headers.authorization
	const token = bearerToken && bearerToken.split(' ')[1]
	if (token == null) return res.status(401).send({ msg: 'No Token Provided' })

	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	if (!decoded) return res.status(403).send({ msg: 'Invalid Token' })

	const user = await User.findById(decoded._id)
	if (!user) throw new Unauthorized('Cannot access route')
	req.user = user
	return next()
}

module.exports = auth

/// ui register