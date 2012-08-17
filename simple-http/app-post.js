var http = require('http')
    form = require('fs').readFileSync('form.html'),
    querystring = require('querystring'),
    util = require('util'),
    maxData = 2 * 1024 * 1024;  // 2 mb

http.createServer(function(request, response) {
    if (request.method === 'GET') {
        response.writeHead(200, {'Content-type': 'text/html'});
        response.end(form);
    }
    if (request.method === 'POST') {
        var data = '';
        request
        .on('data', function(chunk) {
            data += chunk;
            if (data.length > maxData) {
                data = '';
                this.pause();
                response.writeHead(413); // Request Entity Too Large
                response.end('Request Entity Too large');
            }
        })
        .on('end', function() {
            if (!data) {
                // prevents empty post requests
                response.end();
                return;
            }

            var obj = querystring.parse(data);
            console.log('User posted:\n', data);
            response.end('You posted:\n' + util.inspect(obj));
        });
    }
}).listen(8080);
