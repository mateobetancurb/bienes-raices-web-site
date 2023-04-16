const sequelize = require("sequelize");

const db = new sequelize("bienes_raices_app", "root", "root", {
	host: "localhost",
	port: 3306,
	dialect: "mysql",
	define: {
		timestamps: true,
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
	operatorAliases: false,
});

module.exports = db;
