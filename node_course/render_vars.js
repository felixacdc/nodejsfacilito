var http = require("http"),
	fs = require("fs"); 

http.createServer(function(req, res) {

	fs.readFile("./index.html", function(err, html) {
		var html_string = html.toString();

		var variables = html_string.match(/[^\{\}]+(?=\})/g); // match devuelve un arreglo con todas las cadenas enviadas en este caso una exprecion regular
		var nombre = "Félix Méndez";

		for (var i = variables.length - 1; i >= 0; i--) {

			var value = eval(variables[i]); // eval evalua un string y lo ejecuta como codigo js
			html_string = html_string.replace("{" + variables[i] + "}", value);
		}

		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		
		res.write(html_string);
		res.end();
	});
	
}).listen(8080);
