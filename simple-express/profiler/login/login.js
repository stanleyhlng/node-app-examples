var mongo = require('mongoskin'),
    db = mongo.db('location:27017/profiler'),
    users = db.collection('users');

function validate(user, cb) {
    users.findOne({
        name: user.name,
        pwd: user.pwd
    },
    function(err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            cb({msg: 'Invalid login details!'});
            return;
        }
        cb();
    });
}

module.exports = function(req, res, next) {
	var method = req.method.toLowerCase(),
		user = req.body.user || false,
		logout = (method === 'delete'),
		login = (method === 'post' && user),
		routes = req.app.routes[method];

	if (!routes) {
		next();
		return;
	}

	if (login || logout) {
		routes.forEach(function(route) {
			if (!(req.url.match(route.regexp))) {
				console.log(req.url);
				req.method = 'GET';
			}
		});
	}

	if (logout) {
		delete req.session.user;
	}

	if (login) {
/*
		Object.keys(users).forEach(function(name) {
			if (user.name === name && user.pwd === users[name]) {
				req.session.user = {
					name: user.name,
					pwd: user.pwd
				};
			}
		});
*/
		validate(user, function(err) {
			if (err) {
				req.flash('error', err.msg);
				return;
			}
			req.session.user = {
				name: user.name,
				pwd: user.pwd
			};
		});
	}

	if (!req.session.user) {
		req.url = '/';
    }	
	next();
};
