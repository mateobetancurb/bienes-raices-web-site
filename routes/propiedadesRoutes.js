const express = require("express");
const router = express.Router();
const { admin } = require("../controllers/propiedadesController.js");

router.get("/mis-propiedades", admin);

module.exports = router;
