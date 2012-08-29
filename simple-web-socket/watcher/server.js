var http = require('http'),
    path = require('path'),
    fs = require('fs');

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
};

http.createServer(function (request, response) {
    var lookup = path.basename(decodeURI(request.url)) || "index.html",
        file = './' + lookup;
    
    fs.exists(file, function(exists) {
        if (exists) {
            fs.readFile(file, function(err, data) {
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
