const { check, validationResult } = require("express-validator");
const Usuario = require("../models/Usuario.js");
const { generarId } = require("../helpers/tokens.js");
const { emailRegistro } = require("../helpers/emails.js");

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

	// extraer datos del req
	const { nombre, email, password } = req.body;

	// crear el usuario si pasa todas las validaciones
	const usuario = await Usuario.create({
		nombre,
		email,
		password,
		token: generarId(),
	});

	//envia email de confirmacion
	emailRegistro({
		nombre: usuario.nombre,
		email: usuario.email,
		token: usuario.token,
	});

	//mostrar mensaje de confirmacion
	res.render("templates/mensaje", {
		pagina: "Verificar cuenta",
		mensaje: "Te acabamos de enviar un correo para que confirmes tu cuenta",
	});
};

//funcion que confirma una cuenta
const confirmarCuenta = async (req, res) => {
	const { token } = req.params;

	//verificar si el token es valido
	const usuario = await Usuario.findOne({ where: { token } });

	if (!usuario) {
		return res.render("auth/confirmar-cuenta", {
			pagina: "Error al confirmar tu cuenta",
			mensaje: "Hubo un error al confirmar tu cuenta. Intenta de nuevo",
			error: true,
		});
	}

	//confirmar cuenta
	usuario.token = null;
	usuario.confirmado = true;
	await usuario.save();

	return res.render("auth/confirmar-cuenta", {
		pagina: "Cuenta confirmada",
		mensaje: "Se confirmó tu cuenta",
	});
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
	confirmarCuenta,
	formularioOlvidePassword,
};
