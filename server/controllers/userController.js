var models = require('../models');
var User = models.User;
var FriendRequest = models.FriendRequest;
var helper = require('../config/helpers.js');


module.exports.addUser = function(req, res){
  User.create(req.body, {fields: ['name', 'email', 'password']})
  .then(function(user) {
    var token = helper.encode(user);
    res.status(201).json({token: token});
  })
  .catch(function(err){
    return res.status(500).json(err);
  });
};

module.exports.facebookSignIn = function(req, res){

};

module.exports.signIn = function(req, res){
  User.signIn(req.body.email, req.body.password, function(err, data){
    if(err){
      return res.status(500).json(err);
    } else {
      var token = helper.encode(data);
      res.status(200).json({token: token});
    }
  });
};

module.exports.logout = function(req, res){
// TODO
};

module.exports.addFriend = function(req, res){
  // TODO: after-update hook for when friend request is accepted
  // TODO: Sequelize obj - assoc methods
  User.findAll({where: {email: req.body.email}}).then(function(users){
    console.log('User methods', User.Instance.prototype);
    console.log(req.currentUser);
    req.currentUser.addFriend(users[0], { accepted: true }).then(function() {
      res.status(201).end();
    }).catch(function(err) {
      console.log('eff', err);
      res.status(500).json(err);
    });
  })
  .catch(function(err) {
    console.log('err here', err);
    res.status(500).json(err);
  });
};

module.exports.viewAllFriends = function(req, res){
// TODO
};

module.exports.viewFriend = function(req, res){
// TODO
};

module.exports.deleteUser = function(req, res){
  User.destroy({where: {id: req.params.id}}).then(function() {
    res.status(204).end();
  }).catch(function(err) {
    res.status(500).json(err);
  });
};