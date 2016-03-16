var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

module.exports = function(app){
  passport.use(new Strategy({
    clientID: '1716292605259504',
    clientSecret: '',
    callbackURL: 'http://localhost:5000/login/facebook/return'
  },
  function(accessToken, refresh, profile, cb){
    return cb(null, profile);
  }));
  passport.serializeUser(function(user, cb){
    cb(null, user);
  });
  passport.deserializeUser(function(obj, cb){
    cb(null, obj);
  });
}