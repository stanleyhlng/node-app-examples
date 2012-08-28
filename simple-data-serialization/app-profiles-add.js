var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    profiles = require('./profiles'),
    buildXml = require('./build-xml'),
    xml2js = new (require('xml2js')).Parser();;

var index = fs.readFileSync('index-profiles-add.html'),
    buildXmlJs = buildXml.toString();
var routes,
    mimes = {
        js: "application/javascript",
        xml: "application/xml",
        json: "application/json"
    };

function addProfile(request, cb) {
    var profile,
        profileName,
        postData = '';

    request
    .on('data', function(chunk) {
        postData += chunk;
    })
    .on('end', function() {
        var contentType = request.headers['content-type'];

        if (contentType === 'application/json') {
            profile = JSON.parse(postData); 
        }
        if (contentType === 'application/xml') {
            xml2js.parseString(postData, function(err, obj) {
                profile = obj;    
            });
        }

        profileName = profile.profileName;
        profiles[profileName] = profile;
        delete profiles[profileName].profileName;
        cb(output(profiles[profileName], contentType.replace('application/', ''), profileName));
    });
}

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
    },
    "build-xml": function(ext) {
        if (ext === "js") {
            return buildXmlJs;
        }
    }
};

http.createServer(function (request, response) {
    var dirname = path.dirname(request.url),
        extname =  path.extname(request.url),
        basename = path.basename(request.url, extname);

    if (request.method === "POST") {
        addProfile(request, function(output) {
            response.end(output);
        });
        return;
    }

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
