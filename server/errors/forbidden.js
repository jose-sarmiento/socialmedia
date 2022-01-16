const CustomError = require("./custom-error")
const { StatusCodes } = require("http-status-codes")

class Forbidden extends CustomError {
	constructor(message) {
		super(message)
		this.status = StatusCodes.FORBIDDEN
	}
}

module.exports = Forbidden
