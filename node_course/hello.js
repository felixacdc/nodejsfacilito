var http = require("http");

var manejador = function (solicitud, respuesta) {
    console.log("Recibimos una petición");

    // cerrar conexion
    respuesta.end("Hola mundo");
}

// crear el servidor
var servidor = http.createServer(manejador);

servidor.listen(8080);