var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;

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
	User.find(function(err, doc) {
		console.log(doc);
		response.render("login");
	});
});

app.post("/users", function(request, response) {

	var user = new User({
		name: request.body.name,
		last_name: request.body.last_name,
		age: request.body.age,
		email: request.body.email,
		username: request.body.username,
		password: request.body.password, 
		password_confirmation: request.body.password_confirmation,
		sex: request.body.sex
	});

	// Forma de guardar con EcmaScript 5
	/*user.save(function(error, user, numberRows) {
		if ( error ) {
			console.log(String(error));
		}
		response.send("Guardamos tus datos");
	});*/

	// Forma de guardar con EcmaScript 6 (promesas)
	user.save().then(function(user){
		response.send("Guardamos el usuario");
	}, function(error) {
		if ( error ) {
			console.log(String(error));
			response.send("No pudimos guardar el usuario");
		}
	});
	
});

app.listen(8080);