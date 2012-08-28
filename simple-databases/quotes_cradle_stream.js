var cradle = require('cradle'),
	db = new(cradle.Connection)().database('quotes'),
	params = {
		author: process.argv[2],
		quote: process.argv[3]
	};

db.changes().on('response', function(response) {
	response.on('data', function(change) {
		var changeIsObj = {}.toString.call(change) === "[object Object]";
		if (change.deleted || !changeIsObj) {
			return;
		}
		db.get(change.id, function(err, doc) {
			if (!doc) {
				return;
			}
			if (doc.author && doc.quote) {
				console.log("%s: %s \n", doc.author, doc.quote);
			}
		});
	});
});

function errorHandler(err) {
	if (err) {
		console.log(err);
		process.exit();
	}
}

function outputQuotes(err) {
	errorHandler(err);
	if (params.author) {
		db.view('quotes/byAuthor', {
			key: params.author
			},
			function (err, rowsArray) {
				if (err && err.error === "not_found") {
					createQuotesView();
					return;
				}
				errorHandler(err);
				rowsArray.forEach(function(doc) {
					console.log("%s: %s \n", doc.author, doc.quote);
					return;
				});
			}
		);
	}
}

function createQuotesView(err) {
	errorHandler(err);
	db.save('_design/quotes', {
		views: {
			byAuthor: {
				map: 'function (doc) { emit(doc.author, doc) }'
			}
		}
	},
	outputQuotes
	);
}

function checkAndSave(err) {
	errorHandler(err);
	if (params.author && params.quote) {
		db.save({
			author: params.author,
			quote: params.quote
		},
		outputQuotes
		);
		return;
	}
	outputQuotes();
}

db.exists(function(err, exists) {
	errorHandler(err);
	if (!exists) {
		db.create(checkAndSave);
		return;
	}
	checkAndSave();
});
