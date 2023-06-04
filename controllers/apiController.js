const { Categoria, Precio, Propiedad } = require("../models/index.js");

const propiedades = async (req, res) => {
	const propiedades = await Propiedad.findAll({
		include: [
			{ model: Categoria, as: "categoria" },
			{ model: Precio, as: "precio" },
		],
	});

	res.json(propiedades);
};

module.exports = {
	propiedades,
};
