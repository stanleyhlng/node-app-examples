var http = require('http'),
    client = require('fs').readFileSync('client-now.html');

var plainHttpServer = http.createServer(function(request, response) {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    response.end(client);
})
.listen(8080);

var everyone = require('now').initialize(plainHttpServer);
everyone.set('origins', ['localhost:8080', '127.0.0.1:8080']);

everyone.now.base64 = function(sentence, cb) {
    cb(new Buffer(sentence).toString('base64'));    
};

everyone.on('connect', function() {
    this.now.square(4);
});
