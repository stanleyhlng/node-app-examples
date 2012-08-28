var mysql = require('mysql'),
    client = mysql.createClient({
        user: 'root',
        password: '',
        //debug: true
    }),
    params = {
        author: process.argv[2]
    };

client.query('CREATE DATABASE quotes');
client.useDatabase('quotes');
client.query('CREATE TABLE quotes.quotes (' +
    'id INT NOT NULL AUTO_INCREMENT, ' +
    'author VARCHAR(128) NOT NULL, ' +
    'quote TEXT NOT NULL, ' +
    'PRIMARY KEY (id)' +
    ')'
);    

var ignore = [
    mysql.ERROR_DB_CREATE_EXISTS,
    mysql.ERROR_TABLE_EXISTS_ERROR
];
client.on('error', function(err) {
    if (ignore.indexOf(err.number) > -1) {
        console.log("[ERROR]", err);
        return;
    }
    throw err;
});

if (params.author) {
    client.query(
        "SELECT * FROM quotes WHERE " +
        "author LIKE " + client.escape(params.author)
    )
    .on('row', function(record) {
        console.log('%s: %s \n', record.author, record.quote);
    });
}

client.end();
