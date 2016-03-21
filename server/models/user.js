'use strict';
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
// var salt = bcrypt.genSaltSync(10); // FIXME: salts should be per-user and need to be stored in database

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
  //   hooks: {
  //     beforeCreate: function(user, options) {
  //       return user.setHashPassword();
  //     }
  //   },
    instanceMethods: {
    //   setHashPassword: function(){
    //     return User.hashPassword(this.password).bind(this)
    //       .then(function(hash){
    //         this.password = hash;
    //         return this;
    //       });
    //   }
     },
    classMethods: {
      // hashPassword: function(password) {
      //   var cipher = Promise.promisify(bcrypt.hash);
      //   return cipher(password, salt, null);
      // },
      // signIn: function(email, password){
      //   return new Promise(function (resolve, reject) {
      //     User.hashPassword(password)
      //     .then(function(hash){
      //       User.findAll({where: {email: email, password: hash}})
      //       .then(function(users) {
      //         if(users.length === 0) {
      //           reject("Not found");
      //         } else {
      //           resolve(users[0]);
      //         }
      //       })
      //       .catch(reject);
      //     })
      //     .catch(reject);
      //   });
        signIn: function(email, password){  //FIXME: salts
          return new Promise(function (resolve, reject) {
             User.findAll({where: {email: email, password: password}})
            .then(function(users) {
              if(users.length === 0) {
                reject("Not found");
              } else {
                resolve(users[0]);
              }
          });
        });
      },
      associate: function(models){
        //constraints set to false for now to prevent sequelize default behavior
        User.belongsToMany(models.Book, {through: 'UserBook', foreignKey: 'userId', constraints: false});
        //FIXME: error adding more than one friend per user
        User.belongsToMany(models.User, {through: 'FriendRequest', as: 'Friends', foreignKey: 'userId', constraints: false});
        User.belongsToMany(models.User, {through: 'FriendRequest', as: 'Users', foreignKey: 'friendId', constraints: false});
        User.hasMany(models.FriendRequest, {foreignKey: 'userId', constraints: false});
      }
    }
  });
  return User;
};

//TODO: add validations
