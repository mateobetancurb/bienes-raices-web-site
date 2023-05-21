const { DataTypes } = require("sequelize");
const db = require("../config/db.js");

const Categoria = db.define("categorias", {
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

module.exports = Categoria;
