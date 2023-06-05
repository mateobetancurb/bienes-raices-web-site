const { Categoria, Precio, Propiedad } = require("../models/index.js");

const inicio = async (req, res) => {
	const [categorias, precios] = await Promise.all([
		Categoria.findAll({ raw: true }),
		Precio.findAll({ raw: true }),
	]);

	res.render("inicio", {
    pagina: "Inicio",
    categorias,
    precios,
	});
};

const categorias = (req, res) => {
	res.send("categorias");
};

const notFound = (req, res) => {
	res.send("404");
};

const buscador = (req, res) => {
	res.send("buscador");
};

module.exports = {
	inicio,
	categorias,
	notFound,
	buscador,
};
