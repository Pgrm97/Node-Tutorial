var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/nodeproject");

var posibles_valores = ["M", "F"];

var email_match = [];

var password_validation = {
			validator: function(p){
			return this.password_confirmation == p;
			},
			message: "Password not equal"
		}

var user_schema = new Schema({
	name: String,
	last_name: String,
	username: {type: String, required: true, maxlength: [50, "Username muy grande"]}, 
	password: {
		type: String, 
		minlength:[5, "El password es muy corto"],
		validate: password_validation
		
		
	}, 
	age: {type: Number, min:[5, "Edad no menor de 5"], max: [100, "Edad no menor de 100"]},
	email: {type: String, required: "El correo es obligatorio"},
	date_of_birth: Date,
	sex: {type: String, enum: {values: posibles_valores, message:"Opcion no valida"}}
});

user_schema.virtual("password_confirmation").get(function(){
	return this.p_c;
}).set(function(password){
	this.p_c = password;
})

var User = mongoose.model("User", user_schema)

module.exports.User = User;