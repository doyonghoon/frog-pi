var http = require("http");
var Gpio = require('onoff').Gpio, // Constructor function for Gpio objects.
    led = new Gpio(17, 'out'),    // Export GPIO #17 as an output.
    iv;

http.createServer(function(req, res) {
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("frog-pi connected...");
	res.end();

	// iv = setInterval(function() {
	//     led.writeSync(led.readSync() === 0 ? 1 : 0); // 1 = on, 0 = off :)
	// }, 200);

	// // Stop blinking the LED and turn it off after 5 seconds.
	// setTimeout(function() {
	//     clearInterval(iv); // Stop blinking
	//     led.writeSync(0);  // Turn LED off.
	//     led.unexport();    // Unexport GPIO and free resources
	// }, 5000);

	(function blink(count) {
	    if (count <= 0) return led.unexport();

	    led.read(function(err, value) {  // Asynchronous read.
	        if (err) throw err;
		console.log("frog-pi-console connected: value: " + value);
	        led.write(value === 0 ? 1 : 0, function(err) { // Asynchronous write.
	            if (err) throw err;
	        });
	    });

	    setTimeout(function() {
	        blink(count - 1);
	    }, 500);
	})(500);

}).listen(8080);
