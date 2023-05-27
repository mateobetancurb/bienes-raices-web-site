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
};
