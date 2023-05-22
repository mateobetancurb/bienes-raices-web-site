const { check, validationResult } = require("express-validator");
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
		datos: {},
	});
};

const guardarPropiedad = async (req, res) => {
	//validar formulario
	await check("titulo").notEmpty().withMessage("Ingresa un título").run(req);
	await check("descripcion")
		.notEmpty()
		.withMessage("La descripción no puede ir vacía")
		.isLength({ max: 200 })
		.withMessage("La descripción no puede tener más de 200 caracteres")
		.run(req);
	await check("categoria")
		.isNumeric()
		.withMessage("Selecciona una categoría")
		.run(req);
	await check("precio")
		.isNumeric()
		.withMessage("Selecciona un rango de precios")
		.run(req);
	await check("habitaciones")
		.isNumeric()
		.withMessage("Selecciona la cantidad de habitaciones")
		.run(req);
	await check("estacionamientos")
		.isNumeric()
		.withMessage("Selecciona la cantidad de parqueaderos")
		.run(req);
	await check("banos")
		.isNumeric()
		.withMessage("Selecciona la cantidad de baños")
		.run(req);
	await check("lat")
		.notEmpty()
		.withMessage("Ubica la propiedad en el mapa")
		.run(req);

	let resultado = validationResult(req);

	if (!resultado.isEmpty()) {
		const [categorias, precios] = await Promise.all([
			Categoria.findAll(),
			Precio.findAll(),
		]);

		return res.render("propiedades/crear", {
			pagina: "Crear propiedad",
			barra: true,
			categorias,
			precios,
			errores: resultado.array(),
			datos: req.body,
		});
	}
};

module.exports = {
	admin,
	crearPropiedad,
	guardarPropiedad,
};
