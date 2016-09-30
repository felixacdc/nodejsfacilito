var express = require("express");
var Imagen = require("./models/imagenes");
var router = express.Router();
var fs = require("fs");
var redis = require("redis");

var client = redis.createClient();

router.get("/", function (request, response) {
	Imagen.find({})
		.populate("creator")
		.exec(function(error, imagenes) {
			if ( error ) {
				console.log(error);
			} else {
				response.render("app/home", {imagenes: imagenes});
			}
		});
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
		Imagen.find({creator: response.locals.user._id}, function(error, imagenes) {
			if ( !error ) {
				response.render('app/imagenes/index', {imagenes: imagenes});
			} else {
				response.render(error);
			}
		});
	})
	.post(function(request, response) {
		var extension = request.body.archivo.name.split(".").pop();
		var data = {
			title: request.body.title,
			creator: response.locals.user._id,
			extension: extension
		};

		var imagen = new Imagen(data);

		imagen.save(function(error) {
			if ( !error ) {
				var imgJSON = {
					"id": imagen.id,
					"title": imagen.title,
					"extension": imagen.extension
				}

				client.publish("images", JSON.stringify(imgJSON));
				fs.rename(request.body.archivo.path, "public/imgs/" + imagen._id + "." + extension);
				response.redirect("/app/imagenes/" + imagen._id);
			} else {
				response.render(error);
			}
			
		});
	});

module.exports = router;