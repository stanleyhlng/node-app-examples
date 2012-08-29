var fs = require('fs'),
    io = require('socket.io').listen(8081),
    sioclient = require('socket.io-client'),
    watcher = [
        ';(function() {',
        '   var socket = io.connect("ws://localhost:8081");',
        '   socket.on("update", function() {',
        '       location.reload();',
        '   });',
        '}());',
    ].join('');

sioclient.builder(io.transports(), function(err, siojs) {
    if (!err) {
        io.static.add('/watcher.js', function(path, callback) {
            callback(null, new Buffer(siojs + watcher));
        });
    }
});

fs.watch('content/', function(event, filename) {
    console.log("event is " + event);
    
    if (filename) {
        console.log("filename provided: " + filename);
        if (f[0] !== ".") {
            io.sockets.emit('update');
        }
    } else {
        console.log("filename not provided");
    }

});
