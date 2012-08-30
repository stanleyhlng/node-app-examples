var users = {
	'stanleyhlng': ''
};

module.exports = function(req, res, next) {
	var method = req.method.toLowerCase(),
		user = req.body.user || false,
		logout = (method === 'delete'),
		login = (method === 'post' && user),
		routes = req.app.routes[method];

	//console.log("DEBUG", "req.app.routes", req.app.routes);
	console.log("DEBUG", "user", user);
	console.log("DEBUG", "login", login);

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
		Object.keys(users).forEach(function(name) {
			if (user.name === name && user.pwd === users[name]) {
				req.session.user = {
					name: user.name,
					pwd: user.pwd
				};
			}
		});
	}

	if (!req.session.user) {
		req.url = '/';
    }	
	next();
};
