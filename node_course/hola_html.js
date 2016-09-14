var http = require("http"),
	fs = require("fs"); //modulo para optener el archivo

// var html = fs.readFileSync("./index.html"); // Forma sincrona

http.createServer(function(req, res) {

	fs.readFile("./index.html", function(err, html) {
		res.write(html);
		res.end();
	}); // Forma asincrona
	
}).listen(8080);