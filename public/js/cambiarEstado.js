/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/cambiarEstado.js":
/*!*********************************!*\
  !*** ./src/js/cambiarEstado.js ***!
  \*********************************/
/***/ (() => {

eval("(function () {\n\tconst cambiarEstado = document.querySelectorAll(\".cambiar-estado\");\n\tcambiarEstado.forEach((boton) => {\n\t\tboton.addEventListener(\"click\", cambiarEstadoPropiedad);\n\t});\n\n\tasync function cambiarEstadoPropiedad(e) {\n\t\tconst { propiedadId: id } = e.target.dataset;\n\n\t\ttry {\n\t\t\tconst url = `/propiedades/${id}`;\n\t\t\tconst response = await fetch(url, {\n\t\t\t\tmethod: \"PUT\",\n\t\t\t\theaders: {\n\t\t\t\t\t\"Content-Type\": \"application/json\",\n\t\t\t\t},\n\t\t\t});\n\t\t\tconst resultado = await response.json();\n\n\t\t\tif (resultado) {\n\t\t\t\tif (e.target.classList.contains(\"bg-yellow-100\")) {\n\t\t\t\t\te.target.classList.remove(\"bg-yellow-100\", \"text-yellow-800\");\n\t\t\t\t\te.target.classList.add(\"bg-green-100\", \"text-green-800\");\n\t\t\t\t\te.target.textContent = \"Publicado\";\n\t\t\t\t} else {\n\t\t\t\t\te.target.classList.remove(\"bg-green-100\", \"text-green-800\");\n\t\t\t\t\te.target.classList.add(\"bg-yellow-100\", \"text-yellow-800\");\n\t\t\t\t\te.target.textContent = \"No publicado\";\n\t\t\t\t}\n\t\t\t}\n\t\t} catch (error) {\n\t\t\tconsole.log(error);\n\t\t}\n\t}\n})();\n\n\n//# sourceURL=webpack://bienes-raices-web-site/./src/js/cambiarEstado.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/cambiarEstado.js"]();
/******/ 	
/******/ })()
;