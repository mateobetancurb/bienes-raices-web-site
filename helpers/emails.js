const nodemailer = require("nodemailer");

const emailRegistro = async (datos) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const { email, nombre, token } = datos;

	//enviar el email
	await transport.sendMail({
		from: "Bienes Raices App",
		to: email,
		subject: "Confirma tu cuenta en BienesRaices",
		text: "Confirma tu cuenta en BienesRaices",
		html: `
      <h2>Hola ${nombre}</h2>
      <p>Bienvenido a BienesRaices. Por favor confirma tu cuenta</p>
      <a href="${process.env.BACKEND_URL}:${
			process.env.PORT ?? 3000
		}/auth/confirmar/${token}">Confirmar cuenta</a>
      <h5>Si tú no creaste una cuenta puedes ignorar este mensaje</h5>
    `,
	});
};

const emailResetearPassword = async (datos) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const { email, nombre, token } = datos;

	//enviar el email
	await transport.sendMail({
		from: "Bienes Raices App",
		to: email,
		subject: "Restablece tu contraseña en BienesRaices",
		text: "Restablece tu contraseña en BienesRaices",
		html: `
      <h2>Hola ${nombre}</h2>
      <p>Nos has pedido cambiar tu contraseña. Dale clic al link para generar una nueva contraseña</p>
      <a href="${process.env.BACKEND_URL}:${
			process.env.PORT ?? 3000
		}/auth/olvide-password/${token}">Restablecer contraseña</a>
      <h5>Si no quieres cambiar tu contraseña puedes ignorar este mensaje</h5>
    `,
	});
};

module.exports = {
	emailRegistro,
	emailResetearPassword,
};
