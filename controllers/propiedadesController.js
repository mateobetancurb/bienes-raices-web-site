const admin = (req, res) => {
	res.render("propiedades/admin", {
		pagina: "Mis propiedades",
		barra: true,
	});
};

const crearPropiedad = (req, res) => {
  	res.render("propiedades/crear", {
			pagina: "Mis propiedades",
			barra: true,
		});
};

module.exports = {
	admin,
	crearPropiedad,
};
