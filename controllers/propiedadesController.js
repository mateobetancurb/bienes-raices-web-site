const { unlink } = require("node:fs/promises");
const { check, validationResult } = require("express-validator");
const { Categoria, Precio, Propiedad } = require("../models/index.js");

const admin = async (req, res) => {
	const { id } = req.usuario;
	const propiedades = await Propiedad.findAll({
		where: {
			usuarioId: id,
		},
		include: [
			{ model: Categoria, as: "categoria" },
			{ model: Precio, as: "precio" },
		],
	});
	res.render("propiedades/admin", {
		pagina: "Mis propiedades",
		propiedades,
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
	await check("estacionamiento")
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
			categorias,
			precios,
			errores: resultado.array(),
			datos: req.body,
		});
	}

	//crear la propiedad
	try {
		const propiedadGuardada = await Propiedad.create({
			titulo: req.body.titulo,
			descripcion: req.body.descripcion,
			habitaciones: req.body.habitaciones,
			estacionamiento: req.body.estacionamiento,
			banos: req.body.banos,
			calle: req.body.calle,
			lat: req.body.lat,
			lng: req.body.lng,
			precioId: req.body.precio,
			categoriaId: req.body.categoria,
			usuarioId: req.usuario.id,
			imagen: "imagen.jpg",
		});

		const { id } = propiedadGuardada;
		res.redirect(`/propiedades/agregar-imagen/${id}`);
	} catch (error) {
		console.log(error);
	}
};

const agregarImagen = async (req, res) => {
	//validar que la propiedad exista
	const propiedad = await Propiedad.findByPk(req.params.id);

	if (!propiedad) {
		return res.redirect("/mis-propiedades");
	}

	//validar que la propiedad no este publicada
	if (propiedad.publicado) {
		return res.redirect("/mis-propiedades");
	}

	//propiedad pertenece al usuario
	if (propiedad.usuarioId !== req.usuario.id) {
		return res.redirect("/mis-propiedades");
	}

	res.render("propiedades/agregar-imagen", {
		pagina: `Agregar imagen - ${propiedad.titulo}`,
		propiedad,
	});
};

const almacenarImagen = async (req, res) => {
	//validar que la propiedad exista
	const propiedad = await Propiedad.findByPk(req.params.id);

	if (!propiedad) {
		return res.redirect("/mis-propiedades");
	}

	//validar que la propiedad no este publicada
	if (propiedad.publicado) {
		return res.redirect("/mis-propiedades");
	}

	//propiedad pertenece al usuario
	if (propiedad.usuarioId !== req.usuario.id) {
		return res.redirect("/mis-propiedades");
	}

	try {
		//almacenar la imagen en el servidor y publicar la propiedad
		if (req.file) {
			propiedad.imagen = req.file.filename;
			propiedad.publicado = 1;
		}
		await propiedad.save();
		res.redirect("/mis-propiedades");
	} catch (error) {
		console.log(error);
	}
};

const editarPropiedad = async (req, res) => {
	//validar que la propiedad exista
	const propiedad = await Propiedad.findByPk(req.params.id);

	if (!propiedad) {
		return res.redirect("/mis-propiedades");
	}

	//propiedad pertenece al usuario
	if (propiedad.usuarioId !== req.usuario.id) {
		return res.redirect("/mis-propiedades");
	}

	//consultar modelo de precios y categorias
	const [categorias, precios] = await Promise.all([
		Categoria.findAll(),
		Precio.findAll(),
	]);

	res.render("propiedades/editar", {
		pagina: `Editar propiedad: ${propiedad.titulo}`,
		categorias,
		precios,
		datos: propiedad,
	});
};

const guardarPropiedadEditada = async (req, res) => {
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
	await check("estacionamiento")
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

		return res.render("propiedades/editar", {
			pagina: "Editar propiedad",
			categorias,
			precios,
			errores: resultado.array(),
			datos: req.body,
		});
	}

	//validar que la propiedad exista
	const propiedad = await Propiedad.findByPk(req.params.id);

	if (!propiedad) {
		return res.redirect("/mis-propiedades");
	}

	//propiedad pertenece al usuario
	if (propiedad.usuarioId !== req.usuario.id) {
		return res.redirect("/mis-propiedades");
	}

	//actualizar la propiedad
	try {
		await propiedad.update({
			titulo: req.body.titulo,
			descripcion: req.body.descripcion,
			habitaciones: req.body.habitaciones,
			estacionamiento: req.body.estacionamiento,
			banos: req.body.banos,
			calle: req.body.calle,
			lat: req.body.lat,
			lng: req.body.lng,
			precioId: req.body.precio,
			categoriaId: req.body.categoria,
		});
		res.redirect("/mis-propiedades");
	} catch (error) {
		console.log(error);
	}
};

const eliminarPropiedad = async (req, res) => {
	//validar que la propiedad exista
	const propiedad = await Propiedad.findByPk(req.params.id);

	if (!propiedad) {
		return res.redirect("/mis-propiedades");
	}

	//propiedad pertenece al usuario
	if (propiedad.usuarioId !== req.usuario.id) {
		return res.redirect("/mis-propiedades");
	}

	//eliminar la propiedad
	try {
		await propiedad.destroy();
		res.redirect("/mis-propiedades");
	} catch (error) {
		console.log(error);
	}

	//eliminar la imagen de la propiedad
	await unlink(`public/uploads/${propiedad.imagen}`);
	res.redirect("/mis-propiedades");
};

module.exports = {
	admin,
	crearPropiedad,
	guardarPropiedad,
	agregarImagen,
	almacenarImagen,
	editarPropiedad,
	guardarPropiedadEditada,
	eliminarPropiedad,
};
