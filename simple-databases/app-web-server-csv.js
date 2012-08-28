var csv = require('ya-csv'),
    http = require('http');

http.createServer(function(request, response) {
    response.write('[');
    csv.createCsvFileReader('data/AllstarFull.csv')
    .on('data', function(data) {
        response.write(
            ((this.parsingStatus.rows > 0) ? ',' : '') + JSON.stringify(data)
        );
    })
    .on('end', function() {
        response.write(']');
    });    
})
.listen(8080);
