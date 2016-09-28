var Imagen = require("../models/imagenes");
var owner_check = require("./image_permission");

module.exports = function(request, response, next) {
	Imagen.findById(request.params.id)
	.populate("creator")
	.exec(function(error, imagen) {
		if ( imagen != null && owner_check(imagen, request, response) ) {
			console.log("Encontre la imagen");
			response.locals.imagen = imagen;
			next();
		} else {
			response.redirect("/app");
		}
	});
}