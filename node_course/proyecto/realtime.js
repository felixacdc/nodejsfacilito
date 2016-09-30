module.exports = function(server, sessionMiddleware) {
	var io = require("socket.io")(server);

	io.use(function(socket, next) {
		sessionMiddleware(socket.request, socket.request.res, next);
	});

	io.sockets.on("connection", function(socket){
		console.log('Hola socket: ', socket.request.session.user_id);
	});
}