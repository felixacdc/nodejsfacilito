var http = require("http"),
	fs = require("fs"); //modulo para optener el archivo

// var html = fs.readFileSync("./index.html"); // Forma sincrona

http.createServer(function(req, res) {

	fs.readFile("./index.html", function(err, html) {
		res.writeHead(200, {
			"Content-Type": "application/json"
		});
		// JSON.stringify convierte un json a string
		res.write(JSON.stringify({nombre: "Uriel", username: "uriel"}));
		res.end();
	}); // Forma asincrona
	
}).listen(8080);

// curl -I localhost:8080 si lo escribimos en consola nos muestra el encabezado de la peticion