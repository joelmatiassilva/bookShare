// userController only handles users that sign up with email addresses/username
// TODO: possibly create fbController to handle ALL requests from fb login

var models = require('../models');
var User = models.User;
var FriendRequest = models.FriendRequest;
var helper = require('../config/helpers.js');

//Sign In
module.exports.addUser = function(req, res){
  //TODO: check if user already exists
  User.create(req.body, {fields: ['username', 'email', 'password']})
  .then(function(user) {
    var token = helper.encode(user);
    res.status(201).json({token: token});
  })
  .catch(function(err){
    return res.status(500).json(err);
  });
};

module.exports.facebookSignIn = function(req, res){
  // TODO: remove or move to fbController
};

//Log In / Sign In
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
  req.currentUser.getFriends().then(function(friends) {
    friends = friends.map(function(friend) {
      return {
        id: friend.id,
        name: friend.name,
        email: friend.email
      };
    });
    res.status(200).json(friends);
  }).catch(function(err) {
    res.status(500).json(err);
  });
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
  }).catch(function(err) {
    console.log(err);
    res.status(500).json(err);
  });
};

module.exports.deleteUser = function(req, res){
  User.destroy({where: {id: req.params.id}}).then(function() {
    res.status(204).end();
  }).catch(function(err) {
    res.status(500).json(err);
  });
};