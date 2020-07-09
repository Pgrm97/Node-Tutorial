var http = require("http"), fs = require("fs"), parser = require("./params_parser.js");

var p = parser.parse;

http.createServer(function(req,res){
	fs.readFile("./index.html", function(err,html){
		var html_string = html.toString();
		
		var variables = html_string.match(/[^\{\}]+(?=\})/g);
		var name = "Pedro";

		var parametros = p(req);		

		for (var i = variables.length - 1; i >= 0; i--) {
			var variable = variables[i];
			html_string = html_string.replace("{"+variables[i]+"}", parametros[variable]);
		};

	res.writeHead(200);
	res.write(html_string);
	res.end();
	});
}).listen(8080);