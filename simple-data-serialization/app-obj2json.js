var profiles = require('./profiles');
profiles = JSON.stringify(profiles);
profiles = profiles.replace(/name/g, 'fullname');

console.log("INFO", "OBJ > JSON\n", profiles);

profiles = JSON.parse(profiles);
console.log("INFO", "JSON > OBJ\n", profiles);
