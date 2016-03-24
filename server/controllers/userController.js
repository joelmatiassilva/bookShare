// userController only handles users that sign up with email addresses/username
// TODO: possibly create fbController to handle ALL requests from fb login

var models = require('../models');
var User = models.User;
var FriendRequest = models.FriendRequest;
var helper = require('../config/helpers.js');
var bcrypt = require('bcrypt');

//Sign In
module.exports.addUser = function(req, res){
  //TODO: check if user already exists
  User.create(req.body, {fields: ['username', 'email', 'password']})
  .then(function(user) {
    user.generateSalt();
    user.save()
    .then(function(){
      user.password = user.hashPassword(user.password);
      user.save();
    }).then(function(){
      var token = helper.encode(user);
      res.status(201).json({token: token});
    });
  })
  .catch(function(err) {res.status(500).json(err);});
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
  })
  .catch(function(err) {res.status(500).json(err);});
};

module.exports.getFriendRequests = function(req, res) {
  FriendRequest.findAll({ where: { accepted: false , friendId: req.currentUser.id} })
    .then(function(requests) {
      res.status(200).json(requests);
    })
    .catch(function(err) {res.status(500).json(err);});
};

module.exports.signIn = function(req, res){
  User.findAll({where: {email: req.body.email}})
    .then(function(users){
      var user = users[0];
      var userInput = user.hashPassword(req.body.password);
      user.comparePassword(userInput)
      // user.comparePassword(req.body.password, user.password)
      .then(function() {
        var token = helper.encode(user);
        res.status(200).json({token: token});
      })
      .catch(function(err) {res.status(500).json(err);});
    })
    .catch(function(err) {res.status(500).json(err);});
};

module.exports.addFriend = function(req, res){
  User.findAll({where: {email: req.body.email}})
    .then(function(users){
      req.currentUser.addFriend(users[0], { accepted: false })
      .then(function(){
        res.status(201).end();
      })
      .catch(function(err) {res.status(500).json(err);});
    })
    .catch(function(err) {res.status(500).json(err);});
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
  }).catch(function(err) {res.status(500).json(err);});
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
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.deleteUser = function(req, res){
  User.destroy({where: {id: req.params.id}}).then(function() {
    res.status(204).end();
  }).catch(function(err) {res.status(500).json(err);});
};

