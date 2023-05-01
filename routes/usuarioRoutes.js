const express = require("express");
const router = express.Router();

const {
	formularioLogin,
	formularioRegistro,
	registrar,
	confirmarCuenta,
	formularioOlvidePassword,
	resetearPassword,
	comprobarToken,
	nuevoPassword,
} = require("../controllers/usuarioController");

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/confirmar/:token", confirmarCuenta);
router.get("/olvide-password", formularioOlvidePassword);
router.post("/olvide-password", resetearPassword);
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", nuevoPassword);

module.exports = router;
