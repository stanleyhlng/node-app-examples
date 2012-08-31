var express = require('express'),
    http = require('http');

var username = 'stanleyhlng',
    password = '',
    realm = 'node cookbook';

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
});

app.use(express.basicAuth(function(user, pass) {
    return username == user && password == pass;
}, realm));

app.get('/:route?', function(req, res) {
    res.end('Somebody likes soft cheese!');
});

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
