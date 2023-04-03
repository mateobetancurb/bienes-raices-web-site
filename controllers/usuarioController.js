const formularioLogin = (req, res) => {
	res.render("auth/login", {
		autenticado: true,
	});
};

module.exports = {
	formularioLogin,
};
