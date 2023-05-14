(function () {
	const lat = 6.2476;
	const lng = -75.5658;
	const mapa = L.map("mapa").setView([lat, lng], 14);

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(mapa);
})();
