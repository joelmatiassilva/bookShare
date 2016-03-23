// userController only handles users that sign up with email addresses/username
// TODO: possibly create fbController to handle ALL requests from fb login

var models = require('../models');
var User = models.User;
var FriendRequest = models.FriendRequest;
var helper = require('../config/helpers.js');
var bcrypt = require('bcrypt');
// var salt = bcrypt.genSaltSync(10);

//Sign In
module.exports.addUser = function(req, res){
  //TODO: check if user already exists
  User.create(req.body, {fields: ['username', 'email', 'password']})
  .then(function(user) {
    var token = helper.encode(user);
    res.status(201).json({token: token});
  })
  .catch(function(err) {
    console.log('err here', err);
    res.status(500).json(err);
  });
};

module.exports.facebookSignIn = function(req, res){
  // TODO: remove or move to fbController
};

module.exports.findFriends = function(req, res){
  console.log("findFriends" + req.params);
  User.findAll({where: {
    id: {
      $ne: req.currentUser.id
    },
    $or: [
      {
        username: req.params.query
      },
      {
        email: req.params.query
      }
    ]
  }}).then(function(users){
    users = users.map(function(user) {
      return {
        id: user.id,
        name: user.username,
        email: user.email
      };
    });
    res.status(200).json(users);
  }).catch(function(err) {
    res.status(500).json(err);
  });
};

module.exports.getFriendRequests = function(req, res) {
  FriendRequest.findAll({ where: { accepted: false , friendId: req.currentUser.id} }).then(function(requests) {
    console.log(requests);
    res.status(200).json(requests);
  }).catch(function(err) {
    console.error(err);
    res.status(500).json(err);
  });
};

//Log In / Sign In
module.exports.signIn = function(req, res){
  User.signIn(req.body.email, req.body.password)
  .then(function(user){
    var token = helper.encode(user);
    res.status(200).json({token: token});
  })
  .catch(function(err) {
    console.log('err here', err);
    res.status(500).json(err);
  });
};

var reject = function(err) {res.status(500).json(err);};

module.exports.addFriend = function(req, res){
  // TODO: after-update hook for when friend request is accepted
  // TODO: Sequelize obj - assoc methods
  User.findAll({where: {email: req.body.email}})
    .then(function(users){
      req.currentUser.addFriend(users[0], { accepted: false })
      .then(function(){
        res.status(201).end();
      }).catch(reject);
    }).catch(reject);
};

module.exports.acceptFriendRequests = function(req, res) {

};

module.exports.viewAllFriends = function(req, res){
  req.currentUser.getFriends().then(function(friends) {
    friends = friends.map(function(friend) {
      return {
        id: friend.id,
        name: friend.username,
        email: friend.email
      };
    });
    res.status(200).json(friends);
  }).catch(reject);
};

module.exports.viewFriend = function(req, res){
// tables involved:  friendrequests & users
 req.currentUser.getFriendRequests({
    where: {friendId: req.params.id},
    include: {model: User, as: 'Friend'} // references "belongsTo" in FriendRequest
  }).then(function(friendRequests) {
    if (friendRequests.length !== 0) {
      var friend = {
        id: friendRequests[0].Friend.id,
        name: friendRequests[0].Friend.name,
        email: friendRequests[0].Friend.email
      };
      res.status(200).json(friend);
    } else {
      res.status(404).end();
    }
  }).catch(reject);
};

module.exports.deleteUser = function(req, res){
  User.destroy({where: {id: req.params.id}}).then(function() {
    res.status(204).end();
  }).catch(reject);
};

