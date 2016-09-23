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

var posibles_valores = ["M", "F"];
var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email válido"];

var user_schema = new Schema({
	name: String,
	last_name: String,
	username: {
		type: String,
		required: true,
		maxlength: [50, "Usuario muy grande"]
	},
	password: {
		type: String,
		required: true,
		minlength: [8, "La contraseña es muy corta"]
	},
	age: {
		type: Number,
		min: [5, "La edad no puede ser menor que 5"],
		max: [100, "La edad no puede ser mayor que 100"]
	},
	email: {
		type: String,
		required: "El correo es obligatorio",
		match: email_match
	},
	date_of_birth: Date,
	sex: {
		type: String,
		enum: {
			values: posibles_valores,
			message: "Opción no válida"
		}
	}
});

user_schema.virtual("password_confirmation").get(function() {
	return this.p_c;
}).set(function(password) {
	this.p_c = password;
});

var User = mongoose.model('User', user_schema);

module.exports.User = User;