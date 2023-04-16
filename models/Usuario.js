const { DataTypes } = require("sequelize");

const db = require("../config/db.js");

const Usuario = db.define("usuarios", {
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	token: DataTypes.STRING,
	confirmado: DataTypes.BOOLEAN,
});

module.exports = Usuario;
