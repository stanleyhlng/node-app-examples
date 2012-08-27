var profiles = require('./profiles-with-attributes'),
    xml2js = new (require('xml2js')).Parser();

function buildXml(rootObj, rootName) {
    var name = "<?xml version='1.0' encoding='UTF-8'?>\n";
    rootName = rootName || 'xml';
    xml = "<" + rootName + ">\n";

    function attributes(obj, key) {
        if (obj[key].hasOwnProperty('@')) {
            xml = xml.substr(0, xml.length - 1); // remove the ">" part of the open tag 

            Object.keys(obj[key]['@']).forEach(function(attrKey) {
                xml += ' ' + attrKey + '="' + obj[key]['@'][attrKey] + '"';
            });

            xml += ">"; //add the ">" back on 

            delete obj[key]['@']; // remove the key so it isn't traversed as an object
        }
    }

    (function traverse(obj) {
        Object.keys(obj).forEach(function(key) {
            var open = "<" + key + ">",
                close = "</" + key + ">\n";    
                nonObj = (obj[key] && {}.toString.call(obj[key]) !== "[object Object]"),
                isArray = Array.isArray(obj[key]),
                isFunc = (typeof obj[key] === "function");

            if (isArray) {
                obj[key].forEach(function(xmlNode) {
                    var childNode = {};
                    childNode[key] = xmlNode;
                    traverse(childNode);
                });
                return;
            }

            if (key === "#") {
                xml += obj[key] + "\n";
                return;
            }

            xml += open;

            attributes(obj, key);

            if (nonObj) {
                xml += (isFunc) ? obj[key]() : obj[key];
                xml += close;
                return;    
            }

            xml += "\n";
            traverse(obj[key]);
            xml += close;
        });
    }(rootObj));

    xml += "</" + rootName + ">";
    return xml;
}

profiles = buildXml(profiles, "profiles").replace(/name/g, 'fullname');
console.log("INFO", "\nOBJ > XML\n", profiles);

xml2js.parseString(profiles, function(err, obj) {
    profiles = obj;
    console.log("INFO", "\nXML > OBJ\n", profiles);
});
