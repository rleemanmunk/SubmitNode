

var cp = require('child_process');
var path = require('path');

function Sandbox (options) {
	this.options = options || {
		timeout: 5000
	}

	var timer = null;
	var cb = null;
	var child = cp.fork(path.join(__dirname,'shovel.js'));

	child.on('message', function (m) {
		console.log(m);
		var output = null;
		if (m.result) output = m.result;
		cb && cb(output);
	});
	child.on('close', function (exitcode) {
		console.log("child finished: " + exitcode);
		if (timer) clearTimeout(timer);
	});

	this.code = function (code) {
		child.send({code:code});
		//console.log(child);
	};

	this.run = function (code, callback) {
		child.send({run: true, code: code});
		cb = callback;
		timer = setTimeout( function() {
			output = ["Timeout Error"];
			cb && cb(output);
			child.kill( 'SIGKILL' );
		}, this.options.timeout);
	};
}

module.exports = Sandbox;
