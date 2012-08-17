var http = require('http');

http.createServer(function (request, response) {
    if (request.url === "/favicon.ico") {
        response.end();
        return;
    }
    response.end("gotcha!");
}).listen(8080);
