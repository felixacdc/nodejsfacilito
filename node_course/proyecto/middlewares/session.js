var User = require("../models/user").User;

module.exports = function (request, response, next) {
	if ( !request.session.user_id ) {
		response.redirect("/login");
	} else {
		User.findById(request.session.user_id, function(error, user) {
			if ( error ) {
				console.log(error);
				response.redirect("/login");
			} else {
				response.locals = {
					user: user
				};

				next();
			}
		});
	}
}