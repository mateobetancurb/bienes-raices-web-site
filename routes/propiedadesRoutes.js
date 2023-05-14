const express = require("express");
const router = express.Router();
const {
	admin,
	crearPropiedad,
} = require("../controllers/propiedadesController.js");

router.get("/mis-propiedades", admin);
router.get("/propiedades/crear", crearPropiedad);

module.exports = router;
