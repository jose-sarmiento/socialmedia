const { StatusCodes } = require("http-status-codes")
const CustomError = require("./custom-error")

class BadRequest extends CustomError {
	constructor(message) {
		super(message)
		this.status = StatusCodes.BAD_REQUEST
	}
}

module.exports = BadRequest
