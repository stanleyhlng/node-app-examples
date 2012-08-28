var mongo = require('mongoskin'),
	client = mongo.db('localhost:27017/quotes'),
	collection = client.collection('quotes'),
	params = {
		author: process.argv[2],
		quote: process.argv[3]
	};

if (params.author && params.quote) {
	collection.insert({
		author: params.author,
		quote: params.quote
	});
}

if (params.author) {
	collection.findEach({}, function(err, doc) {
		if (err) {
			throw err;
		}
		if (doc) {
			console.log("%s: %s \n", doc.author, doc.quote);
			return;
		}
		client.close();
	});
	return;
}

client.close();
