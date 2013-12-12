var Gpio = require('onoff').Gpio, // Constructor function for Gpio objects.
    led = new Gpio(17, 'out'),    // Export GPIO #17 as an output.
    iv;

exports.switcher = function(req, res) {
	var status = -1;
	var statusValue = 'default';
	var switcherValue = req.param('switcherValue');

	console.log("value: " + switcherValue);

	led.read(function(err, value) {
		handleErr(err);
		if (switcherValue === '1') {
			led.write(0, function(err) {handleErr(err);});
		} else if (switcherValue === '0') {
			led.write(1, function(err) {handleErr(err);});
		} else if (switcherValue === '2') {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('' + value);
		}

		console.log("controlSwitch: " + switcherValue);

		statusValue = getStatusValue(value);
		console.log("statusValue: " + statusValue);

		if (switcherValue !== '2') {
			res.render('index', {
				title: 'Frog Pi',
				statusValue: statusValue
			});
		}
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
		return '꺼져 있음';
	}
	else if (value === 1) {
		return '켜져 있음';
	}
}

function handleErr(err) {
	if (err) throw err;
}
