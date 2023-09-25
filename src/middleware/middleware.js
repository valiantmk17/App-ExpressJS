const logRequest = (req, res, next) => {
	console.log("isi req dari middleware: ", req.body);
	next();
}

module.exports = logRequest