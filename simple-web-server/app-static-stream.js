var http = require('http'),
    path = require('path'),
    fs = require('fs');

var mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css'
};

var cache = {
    store: {},
    maxSize: 26214400,   // (bytes) 25mb
    maxAge: 5400 * 1000, // (ms) 1 and a half hours
    cleanAfter: 7200 * 1000, // (ms) 2 hours
    cleanedAt: 0, // to be set dynamically
    clean: function(now) {
        if (now - this.cleanAfter > this.cleanAt) {
            this.cleanedAt = now;
            var that = this;
            Object.keys(this.store).forEach(function (file) {
                if (now > that.store[file].timestamp + that.maxAge) {
                    console.log('deleting cache ' + file);
                    delete that.store[file];
                }    
            });
        }
    }
};

http.createServer(function (request, response) {
    var lookup = path.basename(decodeURI(request.url)) || "index.html",
        file = 'content/' + lookup;
    
    fs.exists(file, function(exists) {
        if (exists) {

            var headers = {'Content-type': mimeTypes[path.extname(file)]};
            if (cache.store[file]) {
                
                console.log('loading ' + file + ' from cache');
                
                response.writeHead(200, headers);
                response.end(cache.store[file].content);
                return;
            }

            var rs = fs.createReadStream(file, {
                    bufferSize: 10
                })
                .once('open', function() {
                    console.log('piping ' + file);
                    response.writeHead(200, headers);
                    this.pipe(response);
                })
                .once('error', function() {
                    console.log(e);
                    response.writeHead(500);
                    response.end('Server Error!');
                });

            fs.stat(file, function(err, stats) {
                if (stats.size < cache.maxSize) {
                    console.log('stats.size=' + stats.size);

                    var offset = 0;
                    cache.store[file] = {
                        content: new Buffer(stats.size),
                        timestamp: Date.now()
                    };
                    
                    rs.on('data', function(chunk) {
                        console.log('streaming ' + file + ' offset=' + offset);
                        console.log(typeof chunk);
                        chunk.copy(cache.store[file].content, offset);
                        offset += chunk.length; 
                    });
                }
            });

            return;
        }

        response.writeHead(404); // no such file found!
        response.end();

    });

    cache.clean(Date.now());

}).listen(8080);
