var http = require('http'),
    fs = require('fs'),
    profiles = require('./profiles'),
    buildXml = require('./build-xml'),
    index = fs.readFileSync('index.html')
    io = require('socket.io').listen(
        http.createServer(function(request, response) {
            response.setHeader('Content-Type', 'text/html');
            response.end(index);
        }).listen(8080)
    );

io.of('/json')
.on('connection', function(socket) {

    socket.on('profiles', function(cb) {
        cb(Object.keys(profiles));
    });

    socket.on('profile', function(profile) {
        socket.emit('profile', profiles[profile]);
    });

});

io.of('/xml')
.on('connection', function(socket) {

    socket.on('profile', function(profile) {
        socket.emit('profile', buildXml(profiles[profile]));
    });

});
