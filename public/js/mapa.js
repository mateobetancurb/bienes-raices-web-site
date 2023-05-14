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

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ (() => {

eval("(function () {\n\tconst lat = 6.2476;\n\tconst lng = -75.5658;\n\tconst mapa = L.map(\"mapa\").setView([lat, lng], 14);\n\tlet marker;\n\n\t//utilizar el provider y el geocoder\n\tconst geocodeService = L.esri.Geocoding.geocodeService();\n\n\tL.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\n\t\tattribution:\n\t\t\t'&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n\t}).addTo(mapa);\n\n\t//ubicacion del pin\n\tmarker = new L.marker([lat, lng], {\n\t\tdraggable: true,\n\t\tautoPan: true,\n\t}).addTo(mapa);\n\n\t//detectar movimiento del pin\n\tmarker.on(\"moveend\", function (e) {\n\t\tmarker = e.target;\n\t\tconst posicion = marker.getLatLng();\n\t\tmapa.panTo(new L.LatLng(posicion.lat, posicion.lng));\n\n\t\t//obtener la informacion de las calles al soltar el pin\n\t\tgeocodeService\n\t\t\t.reverse()\n\t\t\t.latlng(posicion, 14)\n\t\t\t.run(function (error, resultado) {\n\t\t\t\tmarker.bindPopup(resultado.address.LongLabel);\n\n\t\t\t\t//llenar los campos\n\t\t\t\tdocument.querySelector(\".calle\").textContent =\n\t\t\t\t\tresultado?.address?.Address ?? \"\";\n\t\t\t\tdocument.getElementById(\"calle\").value =\n\t\t\t\t\tresultado?.address?.Address ?? \"\";\n\t\t\t\tdocument.getElementById(\"lat\").value = resultado?.latlng?.lat ?? \"\";\n\t\t\t\tdocument.getElementById(\"lng\").value = resultado?.latlng?.lng ?? \"\";\n\t\t\t});\n\t});\n})();\n\n\n//# sourceURL=webpack://bienes-raices-web-site/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"]();
/******/ 	
/******/ })()
;