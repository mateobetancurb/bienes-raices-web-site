const { Dropzone } = require("dropzone");

Dropzone.options.imagen = {
	dictDefaultMessage: "Sube aquí tus imágenes",
	acceptedFiles: ".png,.jpg,.jpeg",
	maxFilesize: 5,
	maxFiles: 1,
	parallelUploads: 1,
	autoProcessQueue: false,
	addRemoveLinks: true,
	dictRemoveFile: "Eliminar imagen",
	dictMaxFilesExceeded: "Sólo puedes subir una imagen",
	paramName: "imagen",
	init: function () {
		const dropzone = this;
		const btnPublicar = document.getElementById("publicar");

		btnPublicar.addEventListener("click", function () {
			dropzone.processQueue();
		});

		dropzone.on("queuecomplete", function () {
			if (dropzone.getActiveFiles().length == 0) {
				window.location.href = "/mis-propiedades";
			}
		});
	},
};
