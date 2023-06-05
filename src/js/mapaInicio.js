(function () {
	const lat = 6.2476;
	const lng = -75.5658;
	const mapa = L.map("mapa-inicio").setView([lat, lng], 14);

	let markers = new L.FeatureGroup().addTo(mapa);
	let propiedades = [];

	//filtros
	const filtros = {
		categoria: "",
		precio: "",
	};

	const categoriaSelect = document.getElementById("categoria");
	const precioSelect = document.getElementById("precio");

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(mapa);

	//filtrado de categorias y precios
	categoriaSelect.addEventListener("change", (e) => {
		filtros.categoria = Number(e.target.value);
		filtrarPropiedades();
	});

	precioSelect.addEventListener("change", (e) => {
		filtros.precio = Number(e.target.value);
		filtrarPropiedades();
	});

	const getPropiedades = async () => {
		try {
			const res = await fetch("/api/propiedades");
			propiedades = await res.json();
			mostrarPropiedades(propiedades);
		} catch (error) {
			console.log(error);
		}
	};

  const mostrarPropiedades = (propiedades) => {
    //limpiar los markers

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

	const filtrarPropiedades = () => {
		const resultado = propiedades
			.filter(filtrarCategoria)
			.filter(filtrarPrecio);
      mostrarPropiedades(resultado);
	};

	const filtrarCategoria = (propiedad) => {
		if (filtros.categoria) {
			return propiedad.categoriaId === filtros.categoria;
		}
    console.log(propiedad);
		return propiedad;
	};

	const filtrarPrecio = (propiedad) => {
		if (filtros.precio) {
			return propiedad.precioId === filtros.precio;
		}
    console.log(propiedad);
    return propiedad;
	};

	getPropiedades();
})();
