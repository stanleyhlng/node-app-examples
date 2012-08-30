
/*
 * GET home page.
 */

var profiles = require('../profiles');

exports.index = function(req, res){
  res.render('index', { title: 'Express', profiles: profiles });
};
