var http = require("http");

http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello World");
	res.end();

	console.log("frogfrog!! console test");
}).listen(8080);
