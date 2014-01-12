var mongo = require("mongodb");

mongo.MongoClient.connect('mongodb://localhost:27017/comp110', function (err, db) {
	if (err) throw err;
	var collection = db.collection('assignments');

	collection.count(function (err, count) {
		if (err) throw err;
		collection.find({type:1}).each(function(err, folder) {
			count--;
			if (folder == null) return;
			var x = collection.find({folder:folder.name}).each(function (err, file) {
				if (err) throw err;
				if (file == null) {
					db.close();
					return;
				}
				console.log("-----");
				console.dir(file);
				console.log("In folder: " + folder.name);
				console.log("-----");
				//if (count == 0) db.close();
			});
			console.log(x);
		});
	});

});
