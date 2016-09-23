var mongoose = require("mongoose");

var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/fotos");
/**
	tipos de datos en mongo
	String
	Number
	Date
	Buffer
	Boolean
	Mixed
	Objectid
	Array
**/

var user_schema = new Schema({
	name: String,
	last_name: String,
	username: String,
	password: String,
	age: Number,
	email: String,
	date_of_birth: Date
});

user_schema.virtual("password_confirmation").get(function() {
	return this.p_c;
}).set(function(password) {
	this.p_c = password;
});

var User = mongoose.model('User', user_schema);

module.exports.User = User;