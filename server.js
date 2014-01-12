var http = require("http");
var url = require("url");
var fs = require("fs");
var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

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
	var full = url.parse(req.url).path;
	var cmd = path.split("/");

	switch (cmd[1]) {
		case "icsubmit":
			break;
		case "hwsubmit":
			break;
		case "save":
			break;
		case "load":
			break;
		case "assignments":
			console.log(full);
			var id = cmd[2] || null;
			console.log(id || "no id specified");
			if (id == null || id == "root") {
				MongoClient.connect('mongodb://localhost:27017/comp110', function (err, db) {
					if (err) throw err;
					var coll = db.collection('assignments');
					coll.find({type:1}).toArray(function (err, folders) {
						folders.forEach(function (doc) {
							doc.id = doc._id;
							doc.children = true;
						});
						res.writeHead(200, {"Content-Type":"application/json"});
						var data = {
							name: "Assignments",
							id: "root",
							children: folders
						};
						console.log("sending: " + JSON.stringify(data));
						res.write(JSON.stringify(data));
						res.end();
						db.close();
					});
				});
			} else {
				MongoClient.connect('mongodb://localhost:27017/comp110', function (err, db) {
					if (err) throw err;
					var coll = db.collection('assignments');
					coll.find({_id: new ObjectID(id)}).toArray(function (err, folder) {
						if (err) throw err;
						var data = folder[0];
						if (folder.length > 0) {
							coll.find({folder:data.name}).toArray(function (err, files) {
								res.writeHead(200, {"Content-Type":"application/json"});
								console.dir(files);
								data.children = files;
								res.write(JSON.stringify(data));
								res.end();
								db.close();
							});
						}
					});
				});
			}
			break;
		case "rest":
			console.log(full);
			res.writeHead(200, {"Content-Type":"application/json"});
			if (cmd[2]) {
				res.write('{"name":"test","id":"root","children":[{"name":"test2","id":"leaf"}]}');
			} else {
				res.write('[{"name":"test","id":"root","children":true}]');
			}
			res.end();
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
