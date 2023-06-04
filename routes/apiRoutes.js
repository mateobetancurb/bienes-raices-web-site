const express = require("express");
const router = express.Router();
const { propiedades } = require("../controllers/apiController.js");

router.get("/propiedades", propiedades);

module.exports = router;
