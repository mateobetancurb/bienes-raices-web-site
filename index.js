const express = require("express");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const db = require("./config/db.js");

//crear la app
const app = express();

//habilitar lectura datos formularios
app.use(express.urlencoded({ extended: true }));

//conexion db
try {
	db.authenticate();
	console.log("database connected");
} catch (error) {
	console.log(error);
}

//habilitar pug
app.set("view engine", "pug");
app.set("views", "./views");

//carpeta publica
app.use(express.static("public"));

//routing
app.use("/auth", usuarioRoutes);

//definir un puerto y arrancar
const port = 3000;

app.listen(port, () => {
	console.log(`Server runing in port ${port}`);
});
