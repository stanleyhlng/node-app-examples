var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    profiles = require('./profiles'),
    buildXml = require('./build-xml');

var index = fs.readFileSync('index-profiles.html');
var routes,
    mimes = {
        xml: "application/xml",
        json: "application/json"
    };

function output(content, format, rootNode) {
    if (!format || format === "json") {
        return JSON.stringify(content);
    }
    if (format === "xml") {
        return buildXml(content, rootNode);
    }
}

routes = {
    'profiles': function(format) {
        return output(Object.keys(profiles), format);
    },
    '/profile': function(format, basename) {
        return output(profiles[basename], format, basename);
    }
};

http.createServer(function (request, response) {
    var dirname = path.dirname(request.url),
        extname =  path.extname(request.url),
        basename = path.basename(request.url, extname);

    if (request.url == "/favicon.ico") {
        return;
    }

    console.log("[DEBUG]", "request.url", request.url);
    console.log("[DEBUG]", "dirname", dirname);
    console.log("[DEBUG]", "extname", extname);
    console.log("[DEBUG]", "basename", basename);

    // remove period
    extname = extname.replace('.', '');
      
    response.setHeader("Content-Type", mimes[extname] || "text/html");

    if (routes.hasOwnProperty(dirname)) {
        response.end(routes[dirname](extname, basename));
        return;
    }

    if (routes.hasOwnProperty(basename)) {
        response.end(routes[basename](extname));
        return;
    }

    response.end(index);
})
.listen(8080);
