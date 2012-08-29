var http = require('http'),
    fs = require('fs')
    client = fs.readFileSync('index.html');

http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(client);
}).listen(8080);
