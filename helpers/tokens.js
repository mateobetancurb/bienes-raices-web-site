const JWT = require("jsonwebtoken");

const generarJWT = (datos) => {
	return JWT.sign(
		{ id: datos.id, nombre: datos.nombre },
		process.env.JWT_SECRET,
		{ expiresIn: "8h" }
	);
};

const generarId = () => {
	return Math.random().toString(32).substring(2) + Date.now().toString(32);
};

module.exports = {
	generarJWT,
	generarId,
};
