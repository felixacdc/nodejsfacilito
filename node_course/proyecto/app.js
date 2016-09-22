var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use("/public", express.static("public"));
app.use(bodyParser.json());
// extended define con que algoritmo va a hacer el parsin la libreria cuando es false no se puede parsear arreglos, objetos, etc.
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "jade");

app.get("/", function (request, response) {
	response.render("index");
});

app.get("/login", function (request, response) {
	response.render("login");
});

app.post("/users", function(request, response) {
	console.log('Contraseña: ' + request.body.password);
	console.log('Email: ' + request.body.email);
	response.send("Recibimos tus datos");
});

app.listen(8080);