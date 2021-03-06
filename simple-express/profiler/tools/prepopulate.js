var mongo = require('mongoskin'),
    db = mongo.db('localhost:27017/profiler'),
    profiles = require('./profiles'),
    users = [
        {name: 'stanleyhlng', pwd: ''},
        {name: 'terencey', pwd: ''},
        {name: 'michaelay', pwd: ''}
    ];

// make sure collection is empty before populating
db.collection('users').remove({});
db.collection('profiles').remove({});

db.collection('users').insert(users);
Object.keys(profiles).forEach(function(key) {
    db.collection('profiles').insert(profiles[key]);
});

db.close();
