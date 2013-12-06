var http = require("http");
var Gpio = require('onoff').Gpio, // Constructor function for Gpio objects.
    led = new Gpio(17, 'out'),    // Export GPIO #17 as an output.
    iv;

http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Hello World");
	res.end();

	console.log("frogfrog!! console test");

	iv = setInterval(function() {
	    led.writeSync(led.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
	console.log("frog: control LED...");
	}, 200);

	// Stop blinking the LED and turn it off after 5 seconds.
	setTimeout(function() {
	    clearInterval(iv); // Stop blinking
	    led.writeSync(0);  // Turn LED off.
	    led.unexport();    // Unexport GPIO and free resources
	}, 5000);

}).listen(8080);
