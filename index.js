const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes.js");

//crear la app
const app = express();

//habilitar pug
app.set("view engine", "pug");
app.set("views", "./views");

//routing
app.use("/", usuarioRoutes);

//definir un puerto y arrancar
const port = 3000;

app.listen(port, () => {
	console.log(`Server runing in port ${port}`);
});
