var http = require("http"),
	fs = require("fs"),
	parser = require("./params_parser.js")
	rendered = require("./render_view.js"); 

var p = parser.parse;
var ren = rendered.render;

http.createServer(function(req, res) {

	// indexOf es mayor a 0 indica que el texto se encuentra en la cadena
	if ( req.url.indexOf("favicon.ico") > 0 ) { return; }

	fs.readFile("./index.html", function(err, html) {
		
		var parametros = p(req);

		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		
		res.write(ren(html, parametros));
		res.end();
	});
	
}).listen(8080);
