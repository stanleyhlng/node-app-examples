module.exports = function buildXml(rootObj, rootName) {
    var xml = "<?xml version='1.0' encoding='UTF-8'?>\n";
    rootName = rootName || 'xml';
    xml += "<" + rootName + ">\n";

    function attributes(obj, key) {
        if (obj[key].hasOwnProperty('@')) {
            xml = xml.substr(0, xml.length - 1); // remove the ">" part of the open tag
            Object.keys(obj[key]['@']).forEach(function(attrKey) {
                xml += ' ' + attrKey + '=' + obj[key]['@'][attrKey] + '"';
            });
            xml += ">"; // add the ">" back
            
            delete obj[key]['@']; // remove the key so it isn't traversed as an object
        }
    }

    (function traverse(obj) {
        Object.keys(obj).forEach(function(key) {
            var open = "<" + key + ">",
                close = "</" + key + ">\n",
                nonObj = (obj[key] && {}.toString.call(obj[key]) !== "[object object]"),
                isArray = Array.isArray(obj[key]),
                isFunc = (typeof obj[key] === "function");

/*
console.log("[INFO]", "key", key);
console.log("[INFO]", "nonObj", nonObj);
console.log("[INFO]", "isArray", isArray);
console.log("[INFO]", "isFunc", isFunc);
*/

            if (isArray) {
                obj[key].forEach(function (xmlNode) {
                    var childNode = {};
                    childNode[key] = xmlNode;
                    traverse(childNode);
                }); 
                return;
            }

            if (key === '#') {
                // explicit text
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

console.log("[INFO]", "xml", xml);
    return xml;
}
