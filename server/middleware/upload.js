const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'server/uploads/')
	},
	filename(req, file, cb) {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
		cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`)
	}
})

function checkFileType(file, cb) {
	const filetypes = /jpg|jpeg|png|mp4|wmv/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimeType = filetypes.test(file.mimetype)

	if (extname && mimeType) {
		return cb(null, true)
	}
	return cb('Unsupported file type')
}

const upload = multer({
	storage,
	fileFilter(req, file, cb) {
		checkFileType(file, cb)
	}
})

module.exports = upload