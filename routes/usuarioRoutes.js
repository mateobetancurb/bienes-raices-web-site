const express = require("express");
const router = express.Router();
const {
	formularioLogin,
	formularioRegistro,
	registrar,
	formularioOlvidePassword,
} = require("../controllers/usuarioController");

//routing
router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registro", registrar);
router.get("/olvide-password", formularioOlvidePassword);

module.exports = router;
