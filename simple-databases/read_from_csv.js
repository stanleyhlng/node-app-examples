var csv = require('ya-csv'),
    reader = csv.createCsvFileReader('data/data.csv'),
    data = [];

reader
.on('data', function(record) {
    data.push(record);
})
.on('end', function() {
    console.log(data);
});
