var express = require("express");

var router = express.Router();

router("/", function (request, response) {
	/* Buscar el usuario */
	response.render("app/home");
});

module.exports = router;