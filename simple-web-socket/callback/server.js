var http = require('http'),
    client = require('fs').readFileSync('client.html'),
    plainHttpServer = http.createServer(function(request, response) {
        response.writeHead(200, {
            'Content-Type': 'text/html'
        });
        response.end(client);
    }).listen(8080);

var io = require('socket.io').listen(plainHttpServer);

io.set('origins', ['localhost:8080', '127.0.0.1:8080']);

io.on('connection', function(socket) {
    
    socket.on('give me a number', function(cb) {
        cb(4);
    });

    socket.emit('give me a sentence', function(sentence) {
        socket.send(new Buffer(sentence).toString('base64'));
    });

});
