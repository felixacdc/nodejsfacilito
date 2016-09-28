var Imagen = require("../models/imagenes");

module.exports = function(request, response, next) {
	Imagen.findById(request.params.id, function(error, imagen) {
		if ( imagen != null ) {
			console.log("Encontre la imagen");
			response.locals.imagen = imagen;
			next();
		} else {
			response.redirect("/app");
		}
	});
}