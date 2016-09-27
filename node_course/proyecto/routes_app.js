var express = require("express");
var Imagen = require("./models/imagenes");
var router = express.Router();

router.get("/", function (request, response) {
	/* Buscar el usuario */
	response.render("app/home");
});

/* REST */
router.get("/imagenes/new", function(request, response) {
	response.render('app/imagenes/new');
});

router.get("/imagenes/:id/edit", function(request, response) {
	Imagen.findById(request.params.id, function(error, imagen) {
		response.render('app/imagenes/edit', {imagen: imagen});
	});
});

router.route("/imagenes/:id")
	.get(function(request, response) {
		Imagen.findById(request.params.id, function(error, imagen) {
			response.render('app/imagenes/show', {imagen: imagen});
		});
	})
	.put(function(request, response) {
		Imagen.findById(request.params.id, function(error, imagen) {
			imagen.title = request.body.title;
			imagen.save(function(error) {
				if ( !error ) {
					response.render('app/imagenes/show', {imagen: imagen});
				} else {
					response.render("app/imagenes/" + imagen.id + "/edit", {imagen: imagen});
				}
			});
		});
	})
	.delete(function(request, response) {

	});

router.route("/imagenes")
	.get(function(request, response) {
		Imagen.find({}, function(error, imagenes) {
			if ( !error ) {
				response.render('app/imagenes/index', {imagenes: imagenes});
			} else {
				response.render(error);
			}
		});
	})
	.post(function(request, response) {
		var data = {
			title: request.body.title
		};

		var imagen = new Imagen(data);

		imagen.save(function(error) {
			if ( !error ) {
				response.redirect("/app/imagenes/" + imagen._id);
			} else {
				response.render(error);
			}
			
		});
	});

module.exports = router;