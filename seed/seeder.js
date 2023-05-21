const categorias = require("./categorias.js");
const Categoria = require("../models/Categoria.js");
const db = require("../config/db.js");

const importarDatos = async () => {
	try {
		//autenticar
		await db.authenticate();

		//generar las columnas de la tabla
		await db.sync();

		//insertar datos
		await Categoria.bulkCreate(categorias);
		console.log("Datos importados");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (process.argv[2] === "-i") {
	importarDatos();
}
