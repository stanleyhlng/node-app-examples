var http = require('http'),
    websocket = require('websocket').server,
    url = require('url'),
    client = require('fs').readFileSync('client.html');

var httpServer = http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(client);
})
.listen(8080);

var websocketServer = new websocket({
    httpServer: httpServer    
});

var accept = ['localhost', '127.0.0.1'];

websocketServer.on('request', function(request) {
    request.origin = request.origin || '*'; // no origin? Then use * as wildcard.
    console.log(request);
    if (accept.indexOf(url.parse(request.origin).hostname) === -1) {
        request.reject();
        console.log("disallowed " + request.origin);
        return;
    }

    var socket = request.accept(null, request.origin); 

    socket.on('message', function(msg) {
        console.log('Received "' + msg.utf8Data + '" from ' + request.origin);
        if (msg.utf8Data === "Hello") {
            socket.send('websockets!');
        }
    });

    socket.on('close', function(code, desc) {
        console.log('Disconnect: ' + code + ' - ' + desc);
    });
});
