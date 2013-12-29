//Load http module
var http = require("http");
var url = require("url");
var fs = require("fs");  //file sy

var port = 3131;

//Creates server, there is a function that has a request and a response. The request comes from the browser and the response is what we send to the browser.
var server = http.createServer(function(req,res) {
	//writes to header, says its writing plain text, 200 means okay
	/*res.writeHead(200, {"content-Type":"text/plain"});
	res.write("Hello, world!");
	res.end();*/
	//Get the pathname from the url, not including variables, etc
	var path = "." + url.parse(req.url).pathname;
	//Give the pathname to the server
	console.log(path);
	//Split pathname into array of its words
	var cmd = path.split("/");
	switch (cmd[1]) {
		case "run":
			break;
		default:
			fs.exists("." + path, function(exists) {
				if (!exists) {
					res.writeHead(404);
					res.write("404 Not Found");
					res.end();
					return;
				}
				fs.readFile(path);
					if(err){
						res.writeHead(400);
						res.write("there was an error on the server");
						res.end();
						return;
					}
					res.writeHead(200, {Content-Type":getType()});
					res.write(data, "binary");
					res.end();
	}
	//End response
	res.end();
});
//Specifies which port(s) to connect to.
server.listen(port);