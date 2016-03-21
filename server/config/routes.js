var helpers = require('./helpers.js');
var passport = require('passport');
var userController = require('../controllers/userController.js');
var bookController = require('../controllers/bookController.js');

module.exports = function (app, express) {
  /*User Routes*/
  app.post('/api/signUp', userController.addUser);
  app.post('/api/signIn', userController.signIn);


  app.use(helpers.decode);
  // TODO: security admin or currentUser access only for delete
  // app.delete('/api/users/:id', userController.deleteUser);


  //TODO: set up routes for viewing friendBooks
  /*Facebook Login Routes*/
  app.get('/login/facebook', passport.authenticate('facebook'));
  app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/#/signIn' }),
  function(req, res) {
    res.redirect('/#/explore');
  });

  app.use(helpers.decode);

  // TODO: security admin or currentUser access only for delete
  // app.delete('/api/users/:id', userController.deleteUser);

  /*Friend Routes*/
  app.post('/api/friendRequests', userController.addFriend); //creates a friendRequest
  app.get('/api/friends', userController.viewAllFriends);
  app.get('/api/friends/:id', userController.viewFriend);

  /*Book Routes*/
  app.get('/api/friends/:id/books', bookController.viewFriendBooks); // all books belonging to one friend
  app.post('/api/books', bookController.addBook);
  app.get('/api/books', bookController.viewMyShelf);
  app.delete('/api/books/:id', bookController.deleteBook);
  app.get('/api/friendsBooks', bookController.viewFriendsBooks); // all books belonging to all friends
  app.get('/api/friendsBooks/:id', bookController.viewFriendBook); // one book belonging to one friend

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
