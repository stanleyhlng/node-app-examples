var http = require('http'),
    fs = require('fs'),
    opts = {
        host: 'localhost',
        path: '/',
        port: 8080,
        method: 'POST',
    },
    boundary = Date.now();

opts.headers = {
    'Content-Type': 'multipart/form-data; boundary="' + boundary + '"'
};

boundary = "--" + boundary;

var request = http.request(opts, function(response) {
    response.on('data', function(chunk) {
        console.log(chunk.toString());
    });
})
.on('error', function(e) {
    console.log("ERROR", e.stack);
});

(function multipartAssembler(files) {
    var file = files.shift(),
        size = fs.statSync(file).size,
        progress = 0;

    console.log("INFO", "file", file);

    fs.createReadStream(file)
    .once('open', function() {
        request.write(
            boundary + '\r\n' +
            'Content-Disposition: ' +
            'form-data: name="user-file"; filename="' + file + '"\r\n' +
            'Content-Type: application/octet-stream\r\n' +
            'Content-Transfer-Encoding: binary\r\n\r\n'
        );     
    })
    .on('data', function(chunk) {
        request.write(chunk);
        progress += chunk.length;    
        console.log(file + ': ' + Math.round((progress / size) * 10000 / 100) + '%');
    })
    .on('end', function() {
        if (files.length) {
            multipartAssembler(files);
            return;
        }
        request.end('\r\n' + boundary + '--\r\n\r\n\r\n');
    });
}(process.argv.splice(2, process.argv.length)));
