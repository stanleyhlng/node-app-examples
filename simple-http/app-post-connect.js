var http = require('http')
    form = require('fs').readFileSync('form.html'),
    connect = require('connect'),
    util = require('util');

connect(
    connect.limit('64kb'), 
    connect.bodyParser(),
    function(request, response) {
        if (request.method === 'POST') {
            console.log('User posted:\n', request.body);
            response.end('You posted:\n' + util.inspect(request.body));
        }
        if (request.method === 'GET') {
            response.writeHead(200, {'Content-type': 'text/html'});
            response.end(form);
        }
    }
).listen(8080);
