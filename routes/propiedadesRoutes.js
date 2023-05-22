const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
	admin,
	crearPropiedad,
	guardarPropiedad,
} = require("../controllers/propiedadesController.js");

router.get("/mis-propiedades", admin);
router.get("/propiedades/crear", crearPropiedad);
router.post(
	"/propiedades/crear",
  body("titulo").notEmpty().withMessage("Ingresa un título"),
  body("precio").notEmpty().withMessage("Ingresa un precio"),
	guardarPropiedad
);

module.exports = router;
