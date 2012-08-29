var io = require('socket.io').listen(8081),
    sioclient = require('socket.io-client')
    widgetScript = require('fs').readFileSync('widget-client.js')
    url = require('url'),
    totals = {};

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

    totals[origin] = (totals[origin]) || 0;
    totals[origin] += 1;
    socket.join(origin);

    io.sockets.to(origin).emit('total', totals[origin]);

    socket.on('disconnect', function() {
        totals[origin] -= 1;
        io.sockets.to(origin).emit('total', totals[origin]);
    });
});
