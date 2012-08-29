var http = require('http'),
    client = require('fs').readFileSync('client-socket-io-custom-event.html');

var plainHttpServer = http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(client);
})
.listen(8080);

var io = require('socket.io').listen(plainHttpServer);

io.set('origins', ['localhost:8080', '127.0.0.1:8080']);

io.sockets.on('connection', function(socket) {
    socket.emit('hello', 'server: socket.io!');    
    
    socket.on('hello', function(msg) {
        console.log('Received a "hello" custom event from ' + msg);
    });

    socket.on('message', function(msg) {
        if (msg == "Hello") {
            socket.send('socket.io!');
        }
    });
});
