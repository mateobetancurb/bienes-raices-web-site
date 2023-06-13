const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const Mensaje = db.define("mensajes", {
	mensaje: {
		type: DataTypes.STRING(200),
		allowNull: false,
	},
});

module.exports = Mensaje;
