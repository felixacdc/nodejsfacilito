var mongoose = require("mongoose");

var Schema = mongoose.Schema;

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
	username: String,
	password: String,
	age: Number,
	email: String,
	date_of_birth: Date
});

