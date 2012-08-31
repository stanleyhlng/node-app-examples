var mongo = require('mongoskin'),
    db = mongo.db('localhost:27017/profiler'),
    profiles = db.collection('profiles');

exports.pull = function(page, cb) {
    var p = {},
        rowsPer = 2,
        skip,
        errs,
        page = page || 1,
        skip = (page - 1) * rowsPer;

    profiles.findEach({}, 
        {limit: rowsPer, skip: skip},
        function(err, doc){
            if (err) {
                errs = errs || []; 
                errs.push(err);
            }
            if (doc) {
                p[doc._id] = doc;
                delete p[doc._id]._id; 
                return;
            }
            cb(errs, p);
        }
    );
};


exports.del = function(profile, cb) {
    profiles.removeById(profile, cb);
}; 


exports.add = function(profile, cb) {
    profiles.insert(profile.profile, cb);
};
