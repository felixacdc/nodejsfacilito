var http = require("http"),
	fs = require("fs"); //modulo para optener el archivo

var html = fs.readFileSync("./index.html");

http.createServer(function(req, res) {
	res.write(html);
	res.end();
}).listen(8080);