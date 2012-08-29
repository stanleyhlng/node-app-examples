
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('staging', function(){
  app.use(express.errorHandler({
    dumpException: true
  }));
});

app.configure('production', function(){
  app.set('port', 8080);
  //app.use(express.staticCache());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler({
    dumpExceptions: true
  }));
});

app.get('/', routes.index);
app.get('/page', function(req, res) {
    res.send('Hello, I am Mr. Page.');
});
app.get('/:page', function(req, res) {
    res.send('Weclome to the ' + req.params.page + ' page');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log("DEBUG", "process.env.NODE_ENV", process.env.NODE_ENV || "");
});
