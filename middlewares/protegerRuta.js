const jwt = require("jsonwebtoken");
const { Usuario } = require("../models/index.js");

const protegerRuta = async (req, res, next) => {
	//verificar si hay un token
	if (!req.cookies._token) {
		return res.redirect("/auth/login");
	}

	//verificar si el token es válido
	try {
		const token = req.cookies._token;
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const usuario = await Usuario.scope("eliminarPassword").findByPk(
			decoded.id
		);

		//almacenar el usuario en la petición
		if (usuario) {
			req.usuario = usuario;
		} else {
			return res.clearCookie("_token").redirect("/auth/login");
		}
		return next();
	} catch (error) {
		console.log(error);
		return res.clearCookie("_token").redirect("/auth/login");
	}
};

module.exports = protegerRuta;
