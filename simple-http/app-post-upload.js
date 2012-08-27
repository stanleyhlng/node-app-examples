var http = require('http'),
    formidable = require('formidable'),
    form = require('fs').readFileSync('form.html');

http.createServer(function(request, response) {
    if (request.method === 'GET') {
        response.writeHead(200, {'Content-type': 'text/html'});
        response.end(form);
    }
    if (request.method === 'POST') {
        var incoming = new formidable.IncomingForm();
        incoming.uploadDir = 'uploads';
        incoming
        .on('fileBegin', function(field, file) {
            file.path += "-" + file.name;
        })
        .on('file', function(field, file) {
            if (!file.size) {
                return;
            }
            response.write(file.name + ' received\n');
        })
        .on('field', function(field, value) {
            response.write(field + ' : ' + value + '\n');
        })
        .on('end', function() {
            response.end('All files received.');
        });
        incoming.parse(request);
    }
}).listen(8080);
