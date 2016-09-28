var Imagen = require("../models/imagenes");

module.exports = function(image, request, response) {

	if (request.method === "GET" && request.path.indexOf("edit") < 0) 
		return true;

	if ( typeof image.creator == "undefined") 
		return false;
	
	if (image.creator._id.toString() == response.locals.user._id)
		return true;

	return false;
}