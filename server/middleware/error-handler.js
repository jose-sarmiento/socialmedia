const CustomError = require('../errors/custom-error')

const errorHandler = (err, req, res, next) => {
	console.log(err)
	if (err instanceof CustomError) {
		return res.status(err.status).send(err.message)
	}
	return res.status(500).send(err)
}

module.exports = errorHandler
