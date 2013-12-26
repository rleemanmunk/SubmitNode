// load connect and path modules
var connect = require('connect');
var path = require('path');

// sets the path to the server's files
// by default to current directory (".")
// or to what you specify as 3rd argument
// node server.js /path/to/other/file
var servePath = path.resolve(".");
if (process.argv[2]) {
	servePath = path.resolve(process.argv[2]);
}

// default port, change to whatever you want
// 80 is typical webserver
// above 1000 is free use
var port = 3131;

// prints out information about the server
console.log(servePath);
console.log("Listening on port: " + port);


// creates the server
var server = connect.createServer(
	// use a logger
	connect.logger(),
	// use the directory specified by servePath
	connect.static(servePath)
);

// starts the server by telling it to listen on the specified port
server.listen(port);
