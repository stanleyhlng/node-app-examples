var csv = require('ya-csv'),
    writer = csv.createCsvFileWriter('data-custom.csv', {
        'separator': '~',
        'quote': '|',
        'escape': '|'
    });

var data = [['a,"','b','c','d','e','f','g'],
            ['h','i','j','k','l','m','n']];

data.forEach(function(record) {
    writer.writeRecord(record);
});
