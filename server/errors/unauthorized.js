const { StatusCodes } = require("http-status-codes")
const CustomError = require("./custom-error")

class Unauthorized extends CustomError {
	constructor(message) {
		super(message)
		this.status = StatusCodes.UNAUTHORIZED
	}
}

module.exports = Unauthorized
