const express = require("express");
const router = express.Router();
const {
	formularioLogin,
	formularioRegistro,
	registrar,
	confirmarCuenta,
	formularioOlvidePassword,
} = require("../controllers/usuarioController");

//routing
router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/confirmar/:token", confirmarCuenta);
router.get("/olvide-password", formularioOlvidePassword);

module.exports = router;
