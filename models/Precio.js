const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const Precio = db.define("precios", {
	nombre: {
		type: DataTypes.STRING(30),
		allowNull: false,
	},
});

module.exports = Precio;
