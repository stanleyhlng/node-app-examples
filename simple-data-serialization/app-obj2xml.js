var profiles = require('./profiles'),
    xml2js = new (require('xml2js')).Parser();

function buildXml(rootObj, rootName) {
    var name = "<?xml version='1.0' encoding='UTF-8'?>\n";
    rootName = rootName || 'xml';
    xml = "<" + rootName + ">\n";

    (function traverse(obj) {
        Object.keys(obj).forEach(function(key) {
            var open = "<" + key + ">",
                close = "</" + key + ">\n";    
                isText = (obj[key] && {}.toString.call(obj[key]) !== "[object Object]");

            xml += open;
            if (isText) {
                xml += obj[key];
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
