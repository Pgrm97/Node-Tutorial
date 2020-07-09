var http = require("http");

var handler = function(request, response){
	console.log("Hello Pedro's World!");
	response.end("Finished request.")
}

var server = http.createServer(handler);

server.listen(8080);