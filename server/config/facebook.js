var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var keys = require('../keys');

module.exports = function(app){
  passport.use(new Strategy({
    clientID: keys.APP_ID,
    clientSecret: keys.APP_SECRET,
    callbackURL: 'http://localhost:5000/login/facebook/return'
  },
  function(accessToken, refresh, profile, cb){
    //TODO Save user information on database 
    //if user doesn't exist already
    console.log(profile);
    return cb(null, profile);
  }));
  passport.serializeUser(function(user, cb){
    cb(null, user);
  });
  passport.deserializeUser(function(obj, cb){
    cb(null, obj);
  });
}