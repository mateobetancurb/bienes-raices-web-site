const inicio = (req, res) => {
	res.render("inicio", {
		pagina: "Inicio",
	});
};

const categorias = (req, res) => {
	res.send("categorias");
};

const notFound = (req, res) => {
	res.send("404");
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
