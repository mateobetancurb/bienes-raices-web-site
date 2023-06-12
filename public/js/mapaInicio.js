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

/***/ "./src/js/mapaInicio.js":
/*!******************************!*\
  !*** ./src/js/mapaInicio.js ***!
  \******************************/
/***/ (() => {

eval("(function () {\n\tconst lat = 6.2476;\n\tconst lng = -75.5658;\n\tconst mapa = L.map(\"mapa-inicio\").setView([lat, lng], 14);\n\n\tlet markers = new L.FeatureGroup().addTo(mapa);\n\tlet propiedades = [];\n\n\t//filtros\n\tconst filtros = {\n\t\tcategoria: \"\",\n\t\tprecio: \"\",\n\t};\n\n\tconst categoriaSelect = document.getElementById(\"categoria\");\n\tconst precioSelect = document.getElementById(\"precio\");\n\n\tL.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n\t\tattribution:\n\t\t\t'&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n\t}).addTo(mapa);\n\n\t//filtrado de categorias y precios\n\tcategoriaSelect.addEventListener(\"change\", (e) => {\n\t\tfiltros.categoria = Number(e.target.value);\n\t\tfiltrarPropiedades();\n\t});\n\n\tprecioSelect.addEventListener(\"change\", (e) => {\n\t\tfiltros.precio = Number(e.target.value);\n\t\tfiltrarPropiedades();\n\t});\n\n\tconst getPropiedades = async () => {\n\t\ttry {\n\t\t\tconst res = await fetch(\"/api/propiedades\");\n\t\t\tpropiedades = await res.json();\n\t\t\tmostrarPropiedades(propiedades);\n\t\t} catch (error) {\n\t\t\tconsole.log(error);\n\t\t}\n\t};\n\n  const mostrarPropiedades = (propiedades) => {\n    //limpiar los markers previos\n    markers.clearLayers();\n\n\n\t\tpropiedades.forEach((propiedad) => {\n\t\t\t//agregar los pines\n\t\t\tconst marker = new L.marker([propiedad?.lat, propiedad?.lng], {\n\t\t\t\tautoPan: true,\n\t\t\t}).addTo(mapa).bindPopup(`\n          <h1 class=\"font-extrabold mb-2\">${propiedad?.titulo}</h1>\n          <img class=\"w-40 h-40 object-cover\" src=\"/uploads/${propiedad?.imagen}\" alt=\"${propiedad?.titulo}\">\n          <p class=\"text-gray-700\">Categoría: ${propiedad?.categoria.nombre}</p>\n          <p class=\"text-gray-700\">Precio: $${propiedad?.precio.nombre}</p>\n          <p class=\"text-gray-700\">${propiedad?.calle}</p>\n          <p class=\"text-gray-700\">Habitaciones: ${propiedad?.habitaciones}</p>\n          <p class=\"text-gray-700\">Parqueaderos: ${propiedad?.estacionamiento}</p>\n          <p class=\"text-gray-700\">Baños: ${propiedad?.banos}</p>\n          <a href=\"/propiedad/${propiedad.id}\" class=\"bg-indigo-600 block text-center p-2 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer font-bold\">Ver propiedad</a>\n        `);\n\n\t\t\tmarkers.addLayer(marker);\n\t\t});\n\t};\n\n\tconst filtrarPropiedades = () => {\n\t\tconst resultado = propiedades\n\t\t\t.filter(filtrarCategoria)\n\t\t\t.filter(filtrarPrecio);\n      mostrarPropiedades(resultado);\n\t};\n\n\tconst filtrarCategoria = (propiedad) => {\n\t\tif (filtros.categoria) {\n\t\t\treturn propiedad.categoriaId === filtros.categoria;\n\t\t}\n    console.log(propiedad);\n\t\treturn propiedad;\n\t};\n\n\tconst filtrarPrecio = (propiedad) => {\n\t\tif (filtros.precio) {\n\t\t\treturn propiedad.precioId === filtros.precio;\n\t\t}\n    console.log(propiedad);\n    return propiedad;\n\t};\n\n\tgetPropiedades();\n})();\n\n\n//# sourceURL=webpack://bienes-raices-web-site/./src/js/mapaInicio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapaInicio.js"]();
/******/ 	
/******/ })()
;