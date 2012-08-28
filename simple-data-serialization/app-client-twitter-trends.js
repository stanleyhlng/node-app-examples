var http = require('http'),
    util = require('util'),
    colors = require('colors');

var trendingTopics = module.exports = {
    trends: {
        opts: {
            host: 'api.twitter.com',
            path: '/1/trends/1.json',   // 1.json provides global trends
            headers: {
                'User-Agent': 'Node Cookbook: Twitter Trends'
            }
        }
    },
    tweets: {
        maxResults: 3,
        resultType: 'realtime',
        language: 'en',
        opts: {
            host: 'search.twitter.com',
            headers: {
                'User-Agent': 'Node Cookbook: Twitter Trends'
            }
        } 
    },
    jsonHandler: function(response, cb) {
        var json = '';
        response.setEncoding('utf8');
        if (response.statusCode === 200) {
            response
            .on('data', function(chunk) {
                json += chunk; 
            })
            .on('end', function() {
                cb(JSON.parse(json));
            });
        } else {
            throw ("Server Returned statusCode error: " + response.statusCode);
        }
    },
    tweetPath: function(q) {
        var p = '/search.json?lang=' + this.tweets.language + 
            '&q=' + q +
            '&rpp=' + this.tweets.maxResults +
            '&include_entities=true' +
            '&with_twitter_user_id=true' +
            '&result_type=' + this.tweets.resultsType;
        this.tweets.opts.path = p;
    }
};

/*
function makeCall(opts, cb) {
    http.get(opts, function(response) {
        // make a call to the twitter api
        trendingTopics.jsonHandler(response, cb); 
    })
    .on('error', function(e) {
        console.log("ERROR", e.message);
    });
}

makeCall(trendingTopics.trends.opts, function(response) {
    console.log(util.inspect(response, true, null));

    trendingTopics.tweetPath(response[0].trends[0].query);
    makeCall(trendingTopics.tweets.opts, function(response) {
        response.results.forEach(function(tweet) {
            console.log("\n" + tweet.from_user.red.bold.underline + ": " + tweet.text);
        });
    });
});
*/
