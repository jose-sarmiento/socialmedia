const url = require('url');

const formatURL = (req) =>
	url.format({
		protocol: req.protocol,
		hostname: req.hostname,
		port: process.env.PORT || 8000,
	});

module.exports = formatURL;
