
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
    dumpExpceptions: true,
    showStack: true
  }));
});

app.configure('production', function(){
  app.use(express.staticCache());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.errorHandler({
    dumpExceptions: true
  }));
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
  console.log("DEBUG", "process.env", process.env);
});
