const categorias = require("./categorias.js");
const Categoria = require("../models/Categoria.js");
const precios = require("./precios.js");
const Precio = require("../models/Precio.js");
const db = require("../config/db.js");

const importarDatos = async () => {
	try {
		//autenticar
		await db.authenticate();

		//generar las columnas de la tabla
		await db.sync();

		//insertar datos
		await Promise.all([
			Categoria.bulkCreate(categorias),
			Precio.bulkCreate(precios),
		]);

		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const eliminarDatos = async () => {
	try {
		await db.sync({ force: true });
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (process.argv[2] === "-i") {
	importarDatos();
}

if (process.argv[2] === "-e") {
	eliminarDatos();
}
