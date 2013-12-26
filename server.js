var connect = require('connect');
var path = require('path');

var servePath = path.resolve(".");
if (process.argv[2]) {
	servePath = path.resolve(process.argv[2]);
}

var port = 3131;

console.log(servePath);
console.log("Listening on port: " + port);
connect.createServer(
	connect.logger(),
	connect.static(servePath)
).listen(port);
