var http = require('http'),
    path = require('path'),
    url = require('url'),
    fs = require('fs');

http.createServer(function(request, response) {
    var lookup = url.parse(decodeURI(request.url)).pathname;
    lookup = (lookup === "/") ? '/index.html' : lookup;
    
    var file = 'content' + lookup;
    console.log(file);

    fs.readFile(file, function(err, data) {
        response.end(data);
    });
}).listen(8080);
