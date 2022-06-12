const { StatusCodes } = require("http-status-codes")
const CustomError = require("./custom-error")

class Forbidden extends CustomError {
	constructor(message) {
		super(message)
		this.status = StatusCodes.FORBIDDEN
	}
}

module.exports = Forbidden
