var http = require('http'),
    url = require('url'),
    profiles = require('./profiles');

http.createServer(function(request, response) {
    var params = url.parse(request.url, true),
        cb = params.query.callback,
        who = params.query.who,
        profile;

    if (cb && who) {
        profile = cb + "(" + JSON.stringify(profiles[who]) + ")";
        response.end(profile);
    }
})
.listen(8080);
