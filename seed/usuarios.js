const bcrypt = require("bcrypt");

const usuarios = [
	{
		nombre: "Mateo",
		email: "mateo@m.com",
		confirmado: 1,
		password: bcrypt.hashSync("1", 10),
	},
];

module.exports = usuarios;
