// userController only handles users that sign up with email addresses/username
// TODO: possibly create fbController to handle ALL requests from fb login

var models = require('../models');
var User = models.User;
var FriendRequest = models.FriendRequest;
var Friends = models.Friends;
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
      return user.save();
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

  User.findOne({where: {$or: [{email: req.body.email}, {username: req.body.username}]}} )
    .then(function(user){
      if (!user){ res.status(404).end(); return;}
      var userInput = user.hashPassword(req.body.password);
      user.comparePassword(userInput)
      .then(function() {
        var token = helper.encode(user);
        res.status(200).json({token: token, username: user.username} );
      })
      .catch(function(err) {console.log("ERROR1", err); res.status(500).json(err);});
    })
    .catch(function(err) {console.log("ERROR2", err); res.status(500).json(err);});
};

module.exports.addFriend = function(req, res){
  User.findAll({where: {email: req.body.email}})
    .then(function(users){
      FriendRequest.create({ userId: req.currentUser.id, friendId: users[0].id, accepted: false })
      .then(function(){
        res.status(201).end();
      })
      .catch(function(err) {res.status(500).json(err);});
    })
    .catch(function(err) {res.status(500).json(err);});
};

module.exports.acceptFriendRequest = function(req, res) {
  var id = req.body.id;
  FriendRequest.findById(id)
  .then(function (friendrequest) {
    //req.currentUser.addFriend()
    Friends.create({userId: friendrequest.userId, friendId: friendrequest.friendId})
    .then(function () {
      Friends.create({userId: friendrequest.friendId, friendId: friendrequest.userId})
      .then(function () {
        friendrequest.destroy()
        .then(function () {
          res.status(201).end();
        }).catch(function(err) {res.status(500).json(err);});
      }).catch(function(err) {res.status(500).json(err);});
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.deleteFriendRequest = function(req, res) {
  var id = req.body.id;
  FriendRequest.findById(id)
  .then(function (friendrequest) {
    friendrequest.destroy()
    .then(function () {
      res.status(201).end();
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json(err);});
}

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

module.exports.getUser = function(req, res){
  User.findById(req.params.id)
  .then(function(user) {
    res.status(200).json(user);
  })
  .catch(function(err) {res.status(500).json(err);});
};

//need to delete friend relationships
module.exports.deleteUser = function(req, res){
  User.destroy({where: {id: req.params.id}}).then(function() {
    res.status(204).end();
  }).catch(function(err) {res.status(500).json(err);});
};

