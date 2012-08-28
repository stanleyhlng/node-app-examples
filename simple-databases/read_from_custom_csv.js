var csv = require('ya-csv'),
    reader = csv.createCsvFileReader('data-custom.csv', {
        'separator': '~',
        'quote': '|',
        'escape': '|'
    }),
    data = [];

reader
.on('data', function(record) {
    data.push(record);
})
.on('end', function() {
    console.log(data);
});
