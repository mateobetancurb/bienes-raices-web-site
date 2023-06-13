const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/index.js");

const identificarUsuario = async (req, res, next) => {
	const token = req.cookies._token;

	if (!token) {
		req.usuario = null;
		return next();
	}

	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET);
		const usuario = await Usuario.scope("eliminarPassword").findByPk(id);

		if (usuario) {
			req.usuario = usuario;
		}

		return next();
	} catch (error) {
		console.log(error);
		return res.clearCookie("_token").redirect("auth/login");
	}
};

module.exports = identificarUsuario;
