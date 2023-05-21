const Precio = require("../models/Precio.js");
const Categoria = require("../models/Categoria.js");

const admin = (req, res) => {
	res.render("propiedades/admin", {
		pagina: "Mis propiedades",
		barra: true,
	});
};

const crearPropiedad = async (req, res) => {
  //consultar modelo de precios y categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);

	res.render("propiedades/crear", {
		pagina: "Mis propiedades",
    barra: true,
    categorias,
    precios,
	});
};

module.exports = {
	admin,
	crearPropiedad,
};
