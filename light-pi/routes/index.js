
/*
 * GET home page.
 */
var Gpio = require('onoff').Gpio, // Constructor function for Gpio objects.
    led = new Gpio(17, 'out'),    // Export GPIO #17 as an output.
    iv;

exports.index = function(req, res) {
	var status = -1;
	var statusValue = 'default';
	led.read(function(err, value) {
		handleErr(err);
		statusValue = getStatusValue(value);

		res.render('index', {
			title: 'Frog Pi',
			statusValue: statusValue
		});
	});
};

function isOn(value) {
	return value === 1;
}

function turnOn() {
	controlSwitch(1);
}

function turnOff() {
	controlSwitch(0);
}

function controlSwitch(value) {
	led.write(value, function(err) {handleErr(err);});
}

function getStatusValue(value) {
	if (value === -1) {
		return '알 수 없음';
	}
	else if (value === 0) {
		return 'ON';
	}
	else if (value === 1) {
		return 'OFF';
	}
}

function handleErr(err) {
	if (err) throw err;
}
