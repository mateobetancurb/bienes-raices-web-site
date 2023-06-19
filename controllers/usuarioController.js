const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario.js");
const { generarJWT, generarId } = require("../helpers/tokens.js");
const {
	emailRegistro,
	emailResetearPassword,
} = require("../helpers/emails.js");

const formularioLogin = (req, res) => {
	res.render("auth/login", {
		pagina: "Iniciar sesión",
	});
};

const autenticarUsuario = async (req, res) => {
	//validando formulario
	await check("email")
		.isEmail()
		.withMessage("Escribe un correo válido")
		.run(req);

	await check("password")
		.notEmpty()
		.withMessage("Ingresa tu contraseña")
		.run(req);

	let resultado = validationResult(req);

	if (!resultado.isEmpty()) {
		return res.render("auth/login", {
			pagina: "Iniciar sesión",
			errores: resultado.array(),
		});
	}

	//validando que el usuario exista
	const usuario = await Usuario.findOne({
		where: { email: req.body.email },
	});

	if (!usuario) {
		return res.render("auth/login", {
			pagina: "Iniciar sesión",
			errores: [{ msg: "Credenciales inválidas" }],
		});
	}

	//validar si el usuario esta confirmado
	if (!usuario.confirmado) {
		return res.render("auth/login", {
			pagina: "Iniciar sesión",
			errores: [
				{
					msg: "Tu cuenta de usuario no ha sido confirmada. Revisa tu correo",
				},
			],
		});
	}

	//validar contraseña
	if (!usuario.verificarPassword(req.body.password)) {
		return res.render("auth/login", {
			pagina: "Iniciar sesión",
			errores: [
				{
					msg: "Credenciales inválidas",
				},
			],
		});
	}

	//autenticar usuario
	const token = generarJWT({ id: usuario.id, nombre: usuario.nombre });

	//almacenar el JWT en una cookie
	return res
		.cookie("_token", token, {
			httpOnly: true,
			// secure: true,
			// sameSite: true,
		})
		.redirect("/mis-propiedades");
};

const cerrarSesion = (req, res) => {
	return res.clearCookie("_token").status(200).redirect("/auth/login");
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
		pagina: "Recupera tu contraseña",
	});
};

const resetearPassword = async (req, res) => {
	await check("email")
		.isEmail()
		.withMessage("Escribe un correo válido")
		.run(req);

	let resultado = validationResult(req);

	if (!resultado.isEmpty()) {
		return res.render("auth/olvide-password", {
			pagina: "Recupera tu contraseña",
			errores: resultado.array(),
		});
	}

	//buscar el usuario
	const usuario = await Usuario.findOne({
		where: { email: req.body.email },
	});

	if (!usuario) {
		return res.render("auth/olvide-password", {
			pagina: "Recupera tu contraseña",
			errores: [{ msg: "Este correo no existe" }],
		});
	}

	//generar un token
	usuario.token = generarId();
	await usuario.save();

	//enviar el correo con las instrucciones
	emailResetearPassword({
		email: usuario.email,
		nombre: usuario.nombre,
		token: usuario.token,
	});

	//mostrar mensaje al usuario
	res.render("templates/mensaje", {
		pagina: "Restablece tu contraseña",
		mensaje: "Te acabamos de enviar un correo con las instrucciones",
	});
};

const comprobarToken = async (req, res) => {
	const { token } = req.params;
	const usuario = await Usuario.findOne({ where: { token } });

	if (!usuario) {
		return res.render("auth/confirmar-cuenta", {
			pagina: "Restablece tu contraseña",
			mensaje: "Hubo un error al validar tu información. Intenta de nuevo",
			error: true,
		});
	}

	//mostrar formulario para restablecer contraseña
	res.render("auth/reset-password", {
		pagina: "Restablece tu contraseña",
	});
};

const nuevoPassword = async (req, res) => {
	//validar el password
	await check("password")
		.isLength({ min: 1 })
		.withMessage("La contraseña debe tener más de 1 caracter")
		.run(req);

	let resultado = validationResult(req);

	if (!resultado.isEmpty()) {
		return res.render("auth/reset-password", {
			pagina: "Restablecer contraseña",
			errores: resultado.array(),
		});
	}
	const { token } = req.params;
	const { password } = req.body;

	//identificar quien hace el cambio
	const usuario = await Usuario.findOne({ where: { token } });

	//hashear el password
	const salt = await bcrypt.genSalt(10);
	usuario.password = await bcrypt.hash(password, salt);
	usuario.token = null;

	await usuario.save();

	res.render("auth/confirmar-cuenta", {
		pagina: "Cambio realizado",
		mensaje: "La nueva contraseña se guardó correctamente",
	});
};

module.exports = {
	formularioLogin,
	autenticarUsuario,
	cerrarSesion,
	formularioRegistro,
	registrar,
	confirmarCuenta,
	formularioOlvidePassword,
	resetearPassword,
	comprobarToken,
	nuevoPassword,
};
