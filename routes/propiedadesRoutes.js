const express = require("express");
const router = express.Router();
const {
	admin,
	crearPropiedad,
	guardarPropiedad,
	agregarImagen,
	almacenarImagen,
	editarPropiedad,
	guardarPropiedadEditada,
  eliminarPropiedad,
  cambiarEstado,
  mostrarPropiedad,
  enviarMensaje,
  verMensajes
} = require("../controllers/propiedadesController.js");
const protegerRuta = require("../middlewares/protegerRuta.js");
const identificarUsuario = require("../middlewares/identificarUsuario.js");
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
router.get("/propiedades/editar/:id", protegerRuta, editarPropiedad);
router.post("/propiedades/editar/:id", protegerRuta, guardarPropiedadEditada);
router.post("/propiedades/eliminar/:id", protegerRuta, eliminarPropiedad);
router.put("/propiedades/:id", protegerRuta, cambiarEstado);

//area publica
router.get("/propiedad/:id", identificarUsuario, mostrarPropiedad);

//almacenar los mensajes
router.post("/propiedad/:id", identificarUsuario, enviarMensaje);

//leer mensajes recibidos
router.get("/mensajes/:id", protegerRuta, verMensajes);

module.exports = router;
