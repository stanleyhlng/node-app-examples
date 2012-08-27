var http = require('http'),
    url = require('url'),
    opts = {
        host: 'www.nodejs.org',
        path: '/',
        port: '80'
    };

if (process.argv[2]) {
    if (!process.argv[2].match('http://')) {
        process.argv[2] = 'http://' + process.argv[2];
    }
    opts = url.parse(process.argv[2]);
}
console.log("INFO", "opts", opts);

http.get(opts, function(response) {
    response.on('data', function(chunk) {
        console.log(chunk.toString());
    });
})
.on('error', function(e) {
    console.log("ERROR", e.message);
});
