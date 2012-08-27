var http = require('http'),
    fs = require('fs');
var options = {};
    options.file = '50meg';
    options.fileSize = fs.statSync(opts.file).size;
    options.kbps = 32;

function throttle(download, cb) {
    var chunkOutSize = download.kbps * 1024,
        timer = 0;

    (function loop(bytesSent) {
        var remainingOffset;
        if (!download.aborted) {
            setTimeout(function() {

                var bytesOut = byteSent + chunkOutSize;

                if (download.offset > bytesOut) {
                    timer = 1000;
                    cb(download.chunks.slice(byteSent, bytesOut));
                    loop(bytesout);
                    return;
                }

                if (bytesOut >= download.chunks.length) {
                    remainingOffset = download.chunks.length - bytesSent;
                    cb(download.chunks.slice(remainingOffset, bytesSent);
                    return;
                }

                loop(bytesSent); // continue to loop, wait for enough data

            }, timer);
        }
    }(0));

    return function() {
        // return a function to handle an about scenario
        download.aborted = true;
    }
}

http.createServer(function(request, response) {
    var download = Object.create(options);
    download.chunks = new Buffer(download.fileSize);
    download.offset = 0;

    response.writeHeader(200, {'Content-Length': options.fileSize});

    fs.createReadStream(options.file)
    .on('data', function(chunk) {
        chunk.copy(download.chunks, download.offset);
        download.offset += chunk.length;
    })
    .once('open', function() {
        // this is where the throttling will happen
        var handleAbout = throttle(download, function(send) {
            response.write(send);
        });
        request.on('close', function() {
            handleAbout();
        });
    });

}).listen(8080);
