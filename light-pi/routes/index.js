
/*
 * GET home page.
 */
var Gpio = require('onoff').Gpio, // Constructor function for Gpio objects.
    led = new Gpio(17, 'out'),    // Export GPIO #17 as an output.
    iv;

exports.index = function(req, res) {
	var status = -1;
	var statusValue = '';
	led.read(function(err, value) {
		if (err) throw err;
		statusValue = getStatusValue(value);

		res.render('index', {
			title: 'Frog Pi',
			statusValue: statusValue
		});
	});

	// led.write(1, function(err) {
	// 	if (err) throw err;
	// });
};

function getStatusValue(value) {
	if (status === -1) {
		return '알 수 없음';
	}
	else if (status === 0) {
		return '꺼져 있음';
	}
	else if (status === 1) {
		return '켜져 있음';
	}
}
