const express = require("express");
const router = express.Router();
const {
	admin,
	crearPropiedad,
	guardarPropiedad,
	agregarImagen,
	almacenarImagen,
} = require("../controllers/propiedadesController.js");
const protegerRuta = require("../middlewares/protegerRuta.js");
const upload = require("../middlewares/subirImagen.js");

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, crearPropiedad);
router.post("/propiedades/crear", protegerRuta, guardarPropiedad);
router.get("/propiedades/agregar-imagen/:id", protegerRuta, agregarImagen);
router.post(
	"/propiedades/agregar-imagen/:id",
	protegerRuta,
	upload.single("imagen"),
	almacenarImagen
);

module.exports = router;
