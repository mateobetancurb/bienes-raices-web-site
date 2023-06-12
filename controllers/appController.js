const { Categoria, Precio, Propiedad } = require("../models/index.js");

const inicio = async (req, res) => {
	const [categorias, precios, casas, departamentos] = await Promise.all([
		Categoria.findAll({ raw: true }),
		Precio.findAll({ raw: true }),
		Propiedad.findAll({
			limit: 3,
			where: {
				categoriaId: 1,
			},
			include: [
				{
					model: Precio,
					as: "precio",
				},
			],
			order: [["createdAt", "DESC"]],
		}),
		Propiedad.findAll({
			limit: 3,
			where: {
				categoriaId: 2,
			},
			include: [
				{
					model: Precio,
					as: "precio",
				},
			],
			order: [["createdAt", "DESC"]],
		}),
	]);

	res.render("inicio", {
		pagina: "Inicio",
		categorias,
		precios,
		casas,
		departamentos,
	});
};

const categorias = async (req, res) => {
	const { id } = req.params;

	//comprobar que la categoria existe
	const categoria = await Categoria.findByPk(id);

	if (!categoria) {
		res.sendStatus(404).redirect("/404");
	}

	//filtrar las propiedades por categoria
	const propiedades = await Propiedad.findAll({
		where: {
			categoriaId: id,
		},
		include: [
			{
				model: Precio,
				as: "precio",
			},
		],
	});

	//si el nombre termina en s, se le quita la s
	let nombreCategoria = categoria?.nombre;
	if (nombreCategoria.endsWith("s")) {
		nombreCategoria = nombreCategoria.slice(0, -1);
	}

	res.render("categoria", {
		pagina: `Categoría: ${nombreCategoria}s`,
		propiedades,
		categoria,
	});
};

const notFound = (req, res) => {
	res.render("404", {
		pagina: "No existe lo que estás buscando",
	});
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
