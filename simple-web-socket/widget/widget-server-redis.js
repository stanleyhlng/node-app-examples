var io = require('socket.io').listen(8081),
    sioclient = require('socket.io-client')
    widgetScript = require('fs').readFileSync('widget-client.js')
    url = require('url'),
    total = require('redis').createClient();

io.configure(function() {
    io.set('resource', '/loc');
    io.enable('browser client gzip');
});

sioclient.builder(io.transports(), function(err, siojs) {

    if (!err) {
        io.static.add('/widget.js', function(path, callback) {
            callback(null, new Buffer(siojs + ';' + widgetScript));
        });    
    }    

});

io.sockets.on('connection', function(socket) {
    var origin = (socket.handshake.xdomain) ? url.parse(socket.handshake.headers.origin).hostname : 'local';

    socket.join(origin);

    total.incr(origin, function(err, total) {
        io.sockets.to(origin).emit('total', total);
    });
    
    socket.on('disconnect', function() {
        total.decr(origin, function(err, total) {
            io.sockets.to(origin).emit('total', total);
        });
    });
});
