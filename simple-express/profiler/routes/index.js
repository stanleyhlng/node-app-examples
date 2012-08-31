var profiles = require('../models/profiles');

exports.index = function(req, res){
  //res.render('index', { title: 'Express' });
  profiles.pull(req.params.pagenum, function(err, profiles) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.render('index', { 
        title: 'Profiler',
        profiles: profiles,
        page: req.params.pagenum
    });
  });
};
