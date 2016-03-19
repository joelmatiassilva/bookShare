'use strict';
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    instanceMethods: {
      signIn: function(){}, //TODO
      logout: function(){}, //TODO,
      comparePassword: function(password, callback){
        bcrypt.compare(password, this.password, function(err, isMatch){
          callback(isMatch);
        });
      },
      //TODO verify if this works
      hashPassword: function(){
        var cipher = Promise.promisify(bcrypt.hash);
        return cipher(this.password, null, null).bind(this)
          .then(function(hash){
            this.password = hash;
            return this.save();
          });
      }
    },
    classMethods: {
      associate: function(models){
        //constraints set to false for now to prevent sequelize default behavior
        User.belongsToMany(models.Book, {through: 'UserBook', foreignKey: 'userId', constraints: false});
        User.belongsToMany(models.User, {through: 'FriendRequest', as: 'Friends', foreignKey: 'userId', constraints: false});
        User.belongsToMany(models.User, {through: 'FriendRequest', as: 'Users', foreignKey: 'friendId', constraints: false});
        User.hasMany(models.FriendRequest, {foreignKey: 'userId', constraints: false});
      }
    }
  });
  return User;
};

//TODO: add validations
