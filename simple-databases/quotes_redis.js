var redis = require('redis'),
	client = redis.createClient(),
	params = {
		author: process.argv[2],
		quote: process.argv[3]
	};

client.on('ready', function() {
	if (params.author && params.quote) {
		var randKey = "Quotes:" + (Math.random() * Math.random()).toString(16).replace('.', '');
		client.hmset(randKey, {
			author: params.author,
			quote: params.quote
		});
		client.add('Author:' + params.author, randKey);
	}
});
