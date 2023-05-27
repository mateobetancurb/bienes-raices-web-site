const multer = require("multer");
const path = require("path");
const { generarId } = require("../helpers/tokens.js");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./public/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, generarId() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

module.exports = upload;
