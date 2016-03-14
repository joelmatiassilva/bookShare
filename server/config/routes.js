var helpers = require('./helpers.js');
var userController = require('../controllers/userController.js');

module.exports = function (app, express) {
  /*User Routes*/
  app.post('/api/signup', userController.addUser);
  app.post('/api/login', userController.login);
  app.post('/api/logout', userController.logout);


  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
