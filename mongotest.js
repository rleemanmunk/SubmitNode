var mongo = require("mongodb");

mongo.MongoClient.connect('mongodb://localhost:27017/comp110', function (err, db) {
	if (err) throw err;
	var collection = db.collection('assignments');

	collection.count(function (err, count) {
		console.log("count: " + count);
	});

	collection.find({type:1}).each(function(err, folder) {
		if (folder == null) return;
		collection.find({folder:folder.name}).each(function (err, file) {
			if (err) throw err;
			if (file == null) return;
			console.log("-----");
			console.dir(file);
			console.log("In folder: " + folder.name);
			console.log("-----");
		});
	});
});
