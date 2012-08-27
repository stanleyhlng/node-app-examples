var http = require('http'),
    opts = {
        host: 'localhost',
        path: '/',
        port: 8080,
        method: 'POST'
    };
var request = http.request(opts, function(response) {
    response.on('data', function(chunk) {
        console.log(chunk.toString());
    });
}).on('error', function(e) {
    console.log("ERROR", e.stack);
});

process.argv.forEach(function(postItem, index) {
    if (index > 1) {
        request.write(postItem + '\n');
    }
});

request.end();
