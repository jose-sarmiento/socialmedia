const jwt = require('jsonwebtoken')

const guest = (req, res, next) => {
	const token = req.header('x-auth-token')

	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	if (!token && decoded) return res.status(403).send({msg: 'Already Login'})

	next()
}

module.exports = guest