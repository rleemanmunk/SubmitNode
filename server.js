var http = require("http");
var https = require("https");
var url = require("url");
var fs = require("fs");
var qs = require("querystring");
var Sandbox = require("sandbox/sandbox");
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
	var postCallbacks = {
		complete: false,
		data: null,
		arr: [],
		add: function(cb) {
			if (typeof cb !== "function") return;
			if (this.complete) {
				cb(this.data);
			} else {
				this.arr.push(cb);
			}
		},
		all: function(data) {
			this.data = data;
			while (this.arr.length > 0) {
				this.arr.shift()(data);
			}
		}
	};
	if (req.method == "POST") {
		var body = "";
		req.on('data', function (data) {
			body += data;
			if (body.length > 1e6) {
				req.connection.destroy();
			}
		});
		req.on('end', function() {
			var POST = qs.parse(body);
			postCallbacks.all(POST);
		});
	}
	var path = "." + url.parse(req.url).pathname;
	var full = url.parse(req.url).path;
	var authPass = full.indexOf("?pass") > -1;
	var cmd = path.split("/");

	switch (cmd[1]) {
		case "icsubmit":
			postCallbacks.add(function (data) {
				var code = decodeURI(data.code);
				var assignment = {
					correct: false,
					output: "",
					msg: ""
				};
				var s = new Sandbox();
				s.run(code, function (output) {
					assignment.output = output;
					res.writeHead(200, {"Content-Type":"application/json"});
					res.write(JSON.stringify(assignment));
					res.end();
				});
				MongoClient.connect("mongodb://localhost:27017/comp110", function (err, db) {
					if (err) throw err;
					db.collection("inclass").insert({
						user: data.user,
						problem: data.problem || "none",
						code: decodeURI(data.code)
					}, function (err, docs) {
						if (err) throw err;
						db.close();
					});
				});
			});
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
		case "pass":
			// TODO secure authentication with vfykey
			console.log("------------");
			console.log("auth passed");
			postCallbacks.add(function(data) {
				for (var v in data) {
					console.log(v + " : " + data[v]);
				}
				var vfyreq = https.request({
					host: 'onyen.unc.edu',
					path: '/cgi-bin/unc_id/authenticator.pl/' + data.vfykey
				}, function (response) {
					console.log("got response from vfykey");
					var str = "";
					response.on('data', function(d) {
						str += d;
					});
					response.on('end', function() {
						console.log(str);
						str = str.split("\n");
						var cookieData = [];
						for (var v in str) {
							str[v] = str[v].split(": ");
							if (str[v][1] == "pass") {
								cookieData.push("id="+str[v][0]);
							} else if (str[v][0] == "displayName") {
								cookieData.push("name="+str[v][1]);
							}
						}
						console.log(JSON.stringify(cookieData));
						console.log("response from vfykey over");
						fs.exists("./index.html", function (exists) {
							if (!exists) {
								res.writeHead(404);
								res.write("404 Not Found");
								res.end();
							}
							fs.readFile("./index.html", "binary", function (err, data) {
								if (err) {
									res.writeHead(400);
									res.write("There was an error on the server");
									res.end();
								}
								//res.writeHead(200, {"Content-Type":"text/html"});
								res.setHeader("Set-Cookie",cookieData);
								res.setHeader("Content-Type","text/html");
								res.write(data, "binary");
								res.end();
							});
						});
					});
				});
				vfyreq.end();
				vfyreq.on('error', function(e) {
					console.error(e);
				});
			});
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
					//res.writeHead(200, {"Content-Type":getType(path)});
					res.setHeader("Content-Type","text/html");
					if (authPass) {
						res.setHeader("Set-Cookie",cookieData);
					}
					res.write(data, "binary");
					res.end();
					return;
				});
				return;
			});
	}
});

server.listen(port);
