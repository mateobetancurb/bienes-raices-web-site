const express = require("express");
const router = express.Router();
const {
	formularioLogin,
	formularioRegistro,
	formularioOlvidePassword,
} = require("../controllers/usuarioController");

//routing
router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.get("/olvide-password", formularioOlvidePassword);

module.exports = router;
