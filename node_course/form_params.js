var http = require("http"),
	fs = require("fs"); 

http.createServer(function(req, res) {

	// indexOf es mayor a 0 indica que el texto se encuentra en la cadena
	if ( req.url.indexOf("favicon.ico") > 0 ) { return; }

	fs.readFile("./index.html", function(err, html) {
		var html_string = html.toString();
		var arreglo_parametros = [];

		var variables = html_string.match(/[^\{\}]+(?=\})/g);

		if ( req.url.indexOf("?") > 0 ) {
			var url_data = req.url.split("?");
			arreglo_parametros = url_data[1].split("&");
		}

		for (var i = arreglo_parametros.length - 1; i >= 0; i--) {
			var parametro = arreglo_parametros[i];
		}

		for (var i = variables.length - 1; i >= 0; i--) {

			var value = eval(variables[i]);
			html_string = html_string.replace("{" + variables[i] + "}", value);
		}

		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		
		res.write(html_string);
		res.end();
	});
	
}).listen(8080);
