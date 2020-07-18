var Imagen = require("../models/imagenes")
var owner_check = require("./image_permission")

module.exports = function(req,res, next){
	Imagen.findById(req.params.id).populate("creator")
	.exec(function(err,image){
		if(image != null && owner_check(image,req,res)){
			console.log("Encontre la imagen de " + image.creator)
			res.locals.imagen = image;
			next();
		}
		else{
			res.redirect("/app");
		}
	})		
}