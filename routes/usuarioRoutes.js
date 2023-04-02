const express = require("express");

const router = express.Router();

//routing
router.get("/", (req, res) => {
	res.send("Hola mundo");
});

module.exports = router;
