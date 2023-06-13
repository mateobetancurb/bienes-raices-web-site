const Propiedad = require("./Propiedad.js");
const Usuario = require("./Usuario.js");
const Categoria = require("./Categoria.js");
const Precio = require("./Precio.js");
const Mensaje = require("./Mensaje.js");

// Relaciones
Propiedad.belongsTo(Precio, { foreignKey: "precioId" });
Propiedad.belongsTo(Categoria, { foreignKey: "categoriaId" });
Propiedad.belongsTo(Usuario, { foreignKey: "usuarioId" });
Propiedad.hasMany(Mensaje, { foreignKey: "propiedadId" });

Mensaje.belongsTo(Propiedad, { foreignKey: "propiedadId" });
Mensaje.belongsTo(Usuario, { foreignKey: "usuarioId" });

module.exports = {
  Propiedad,
	Precio,
	Categoria,
	Usuario,
	Mensaje,
};
