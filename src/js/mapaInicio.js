(function () {
	const lat = 6.2476;
	const lng = -75.5658;
	const mapa = L.map("mapa-inicio").setView([lat, lng], 14);

	let markers = new L.FeatureGroup().addTo(mapa);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(mapa);

	const getPropiedades = async () => {
		try {
			const res = await fetch("/api/propiedades");
			const propiedades = await res.json();
			mostrarPropiedades(propiedades);
		} catch (error) {
			console.log(error);
		}
	};

	const mostrarPropiedades = (propiedades) => {
		propiedades.forEach((propiedad) => {
			//agregar los pines
			const marker = new L.marker([propiedad?.lat, propiedad?.lng], {
				autoPan: true,
			}).addTo(mapa).bindPopup(`
          <h1 class="font-extrabold mb-2">${propiedad?.titulo}</h1>
          <img class="w-40 h-40 object-cover" src="/uploads/${propiedad?.imagen}" alt="${propiedad?.titulo}">
          <p class="text-gray-700">Categoría: ${propiedad?.categoria.nombre}</p>
          <p class="text-gray-700">Precio: $${propiedad?.precio.nombre}</p>
          <p class="text-gray-700">${propiedad?.calle}</p>
          <p class="text-gray-700">Habitaciones: ${propiedad?.habitaciones}</p>
          <p class="text-gray-700">Parqueaderos: ${propiedad?.estacionamiento}</p>
          <p class="text-gray-700">Baños: ${propiedad?.banos}</p>
          <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 block text-center p-2 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer font-bold">Ver propiedad</a>
        `);

			markers.addLayer(marker);
		});
	};
	getPropiedades();
})();
