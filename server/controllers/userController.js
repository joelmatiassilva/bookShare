var user = require('../models/user.js');
var helper = require('../config/helpers.js');


module.exports.addUser =function(req, res){
  console.log('in ctrl: addUser');
  var newUser = req.body;
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(function(user) {

  user.addUser(newUser, function (err, data) {
    if(err) {
      return res.status(500).json(err);
    }
    var token = helper.encode(data);
    res.status(201).json({token: token});
  });
};

module.exports.login = function(req, res){
    user.login(req.body.email, req.body.password, function(err, data){
      if(err){
        return res.status(500).json(err);
      } else {
        var token = helper.encode(data);
        res.status(200).json({token: token});
      }
   });
};

module.exports.logout = function(req, res){
// TODO: logout functionality
};