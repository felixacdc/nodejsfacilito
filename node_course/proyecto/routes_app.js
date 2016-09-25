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

});

router.route("/imagenes/:id")
	.get(function(request, response) {

	})
	.put(function(request, response) {

	})
	.delete(function(request, response) {

	});

router.route("/imagenes")
	.get(function(request, response) {

	})
	.post(function(request, response) {
		var data = {
			title: request.body.title
		};

		var imagen = new Imagen(data);

		imagen.save(function(error) {
			if (true) {
				response.redirect("/imagenes/" + imagen._id);
			} else {
				response.render(error);
			}
			
		});
	});

module.exports = router;