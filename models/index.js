const Propiedad = require("./Propiedad.js");
const Usuario = require("./Usuario.js");
const Categoria = require("./Categoria.js");
const Precio = require("./Precio.js");

// Relaciones
Propiedad.belongsTo(Precio, { foreignKey: "precioId" });
Propiedad.belongsTo(Categoria, { foreignKey: "categoriaId" });
Propiedad.belongsTo(Usuario, { foreignKey: "usuarioId" });

module.exports = {
	Propiedad,
	Usuario,
	Categoria,
	Precio,
};
