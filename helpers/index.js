const esVendedor = (usuarioId, propiedadUsuarioId) => {
	return usuarioId === propiedadUsuarioId;
};

const formatearFecha = (date) => {
	const newDate = new Date(date);
	const options = {
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	return newDate.toLocaleDateString("es-ES", options);
};

module.exports = {
	esVendedor,
	formatearFecha,
};
