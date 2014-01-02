var http = require("http");
var url = require("url");
var fs = require("fs");

var port = 3131;

function getType(filename) {
	if (filename.indexOf(".js") > -1) {
		return "text/javascript";
	} else if (filename.indexOf(".html") > -1) {
		return "text/html";
	} else if (filename.indexOf(".css") > -1) {
		return "text/css";
	} else {
		return "text/plain";
	}
}

var server = http.createServer(function (req,res) {
	var path = "." + url.parse(req.url).pathname;
	var cmd = path.split("/");

	switch (cmd[1]) {
		case "run":
			break;
		default:
			if (path == "./") {
				path = "./index.html";
			}
			fs.exists(path, function (exists) {
				if (!exists) {
					res.writeHead(404);
					res.write("404 Not Found");
					res.end();
					return;
				}
				fs.readFile(path, "binary", function (err, data) {
					if (err) {
						res.writeHead(400);
						res.write("There was an error on the server");
						res.end();
						return;
					}
					res.writeHead(200, {"Content-Type":getType(path)});
					res.write(data, "binary");
					res.end();
					return;
				});
				return;
			});
	}
	return;
});

server.listen(port);