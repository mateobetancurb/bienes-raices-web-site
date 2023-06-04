const express = require("express");
const router = express.Router();
const {
  inicio,
	categorias,
	notFound,
	buscador,
} = require("../controllers/appController.js");

//pagina de inicio
router.get("/", inicio);

//categorias
router.get("/categorias/:id", categorias);

//pagina 404
router.get("/404", notFound);

//buscador
router.post("/buscador", buscador);

module.exports = router;