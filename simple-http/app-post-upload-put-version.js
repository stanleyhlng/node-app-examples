var http = require('http'),
    fs = require('fs');
var form = fs.readFileSync('form-put-version.html');

http.createServer(function(request, response) {
    if (request.method === "PUT") {
        console.log("DEBUG", "request.headers", request.headers);

        var data = new Buffer(+request.headers['content-length']),
            offset = 0;

        request
        .on('data', function(chunk) {
            chunk.copy(data, offset);
            offset += chunk.length;
        })
        .on('end', function() {
            var rand = (Math.random() * Math.random()).toString(16).replace('.', '');
            var target = "uploads/" + rand + "-" + request.headers['x-uploadedfilename'];
            fs.writeFile(target, data, function(err) {
                if (err) {
                    console.log("ERROR", err);
                    return;
                }
                console.log("INFO", "Saved file to " + target);
                response.end();
            });
        });
        
    }
    if (request.method === "GET") {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(form);
    }
}).listen(8080);
