var http = require('http'),
    xml2js = new (require('xml2js')).Parser(),
    colors = require('colors'),
    util = require('util'),
    trendingTopics = require('./app-client-twitter-trends');

var hotTrends = Object.create(trendingTopics, {
    trends: {
        value: {
            opts: {
                host: 'www.google.com',
                path: '/trends/hottrends/atom/hourly',
                headers: {
                    'User-Agent': 'Node Cookbook: Twitter Trends'
                }
            } 
        }
    }
});

hotTrends.xmlHandler = function(response, cb) {
    var hotTrendsFeed = "";
    response
    .on('data', function(chunk) {
        hotTrendsFeed += chunk;
    })
    .on('end', function() {
        xml2js.parseString(hotTrendsFeed, function(err, obj) {
            if (err) {
                throw (err.message);
            }
            xml2js.parseString(obj.entry.content['#'], function(err, obj) {
                if (err) {
                    throw (err.message);
                }
                cb(encodeURIComponent(obj.li[0].span.a['#']));
            });
        });
    });
};

console.log(util.inspect(hotTrends, true, null));

function makeCall(opts, handler, cb) {
    http.get(opts, function(response) {
        handler(response, cb);
    })
    .on('error', function(e) {
        console.log("ERROR", e.message);
    });
}

makeCall(hotTrends.trends.opts, hotTrends.xmlHandler, function(query) {
    hotTrends.tweetPath(query);
    makeCall(hotTrends.tweets.opts, hotTrends.jsonHandler, function(response) {
        response.results.forEach(function(tweet) {
            console.log("\n" + tweet.from_user.red.bold.underline + ": " + tweet.text);
        });
    });    
});
