const { check, validationResult } = require("express-validator");
const Usuario = require("../models/Usuario.js");

const formularioLogin = (req, res) => {
	res.render("auth/login", {
		pagina: "Iniciar sesión",
	});
};

const formularioRegistro = (req, res) => {
	res.render("auth/registro", {
		pagina: "Crear cuenta",
	});
};

const registrar = async (req, res) => {
	await check("nombre")
		.notEmpty()
		.withMessage("El nombre es obligatorio")
		.run(req);

	await check("email")
		.isEmail()
		.withMessage("Escribe un correo válido")
		.run(req);

	await check("password")
		.isLength({ min: 1 })
		.withMessage("La contraseña debe tener más de 1 caracter")
		.run(req);

	await check("repetir_password")
		.equals(req.body.password)
		.withMessage("Las contraseñas deben ser iguales")
		.run(req);

	let resultado = validationResult(req);

	if (!resultado.isEmpty()) {
		return res.render("auth/registro", {
			pagina: "Crear cuenta",
			errores: resultado.array(),
			usuario: {
				nombre: req.body.nombre,
				email: req.body.email,
			},
		});
	}

	const existeUsuario = await Usuario.findOne({
		where: { email: req.body.email },
	});

	if (existeUsuario) {
		return res.render("auth/registro", {
			pagina: "Crear cuenta",
			errores: [{ msg: "Este usuario ya está registrado" }],
			usuario: {
				nombre: req.body.nombre,
				email: req.body.email,
			},
		});
	}

	const usuario = await Usuario.create(req.body);
	res.status(201).json(usuario);
};

const formularioOlvidePassword = (req, res) => {
	res.render("auth/olvide-password", {
		pagina: "Recupera tu acceso a Bienes Raíces",
	});
};

module.exports = {
	formularioLogin,
	formularioRegistro,
	registrar,
	formularioOlvidePassword,
};
