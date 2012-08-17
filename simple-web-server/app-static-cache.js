var http = require('http'),
    path = require('path'),
    fs = require('fs');

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
};

var cache = {};
function cacheAndDeliver(file, cb) {
    if (!cache[file]) {
        fs.readFile(file, function(err, data) {
            if (!err) {
                cache[file] = {content: data};
            }
            cb(err, data);
        });
        return;
    }
    console.log('loading ' + file + 'from cache');
    cb(null, cache[file].content);
}

http.createServer(function (request, response) {
    var lookup = path.basename(decodeURI(request.url)) || "index.html",
        file = 'content/' + lookup;
    
    fs.exists(file, function(exists) {
        if (exists) {
            //fs.readFile(file, function(err, data) {
            cacheAndDeliver(file, function(err, data) {
                if (err) {
                    response.end('Server Error!');
                    return;
                }
                var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
                response.writeHead(200, headers);
                response.end(data);
            });
            return;
        }

        response.writeHead(404); // no such file found!
        response.end();

    });

}).listen(8080);
