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

var image_finder_middleware = require("./middlewares/find_image");

router.all("/imagenes/:id*", image_finder_middleware);

router.get("/imagenes/:id/edit", function(request, response) {
	response.render('app/imagenes/edit');
});

router.route("/imagenes/:id")
	.get(function(request, response) {
		response.render('app/imagenes/show');
	})
	.put(function(request, response) {
		response.locals.imagen.title = request.body.title;
		response.locals.imagen.save(function(error) {
			if ( !error ) {
				response.render('app/imagenes/show');
			} else {
				response.render("app/imagenes/" + request.params.id + "/edit");
			}
		});
	})
	.delete(function(request, response) {
		Imagen.findOneAndRemove({_id: request.params.id}, function(error) {
			if ( !error ) {
				response.redirect("/app/imagenes");
			} else {
				console.log(error);
				response.redirect("/app/imagenes" + request.params.id);
			}
		});
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