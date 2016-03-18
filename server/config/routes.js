var helpers = require('./helpers.js');
var passport = require('passport');
var userController = require('../controllers/userController.js');
var bookController = require('../controllers/bookController.js');

module.exports = function (app, express) {
  /*User Routes*/
  app.post('/api/signup', userController.addUser);
  app.post('/api/signIn', userController.signIn);

  app.use(helpers.decode);

  app.post('/api/logout', userController.logout);

  // TODO: security admin or currentUser access only for delete
  // app.delete('/api/users/:id', userController.deleteUser);

  /*Facebook Login Routes*/
  app.get('/login/facebook', passport.authenticate('facebook'));
  app.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/#/signIn' }),
  function(req, res) {
    res.redirect('/#/explore');
  });

  /*Friend Routes*/
  app.post('/api/friendRequests', userController.addFriend); //creates a friendRequest
  app.get('/api/friends', userController.viewAllFriends);
  app.get('api/friend/:id',userController.viewFriend);

  /*Book Routes*/
  app.post('/api/books', bookController.addBook);
  app.get('/api/books', bookController.viewMyShelf);
  app.get('/api/friends/books', bookController.viewFriendsBooks); //??
  app.delete('/api/books/:id', bookController.deleteBook);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};