'use strict';
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');
// var salt = bcrypt.genSaltSync(10); // FIXME: salts should be per-user and need to be stored in database
var cipher = Promise.promisify(bcrypt.hash);

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(user, options) {
        user.setHashPassword();
      }
    },
    instanceMethods: {
      setHashPassword: function(){
        var salt = bcrypt.genSaltSync(10);
        return User.hashPassword(this.password, salt).bind(this)
          .then(function(hash){
            this.password = hash;
            console.log('GENERATED SALT: ' + salt);
            this.salt = salt;
            this.save().then(function(){
              console.log('Saved salt and hash');
              return;
            });
          });
      },
      comparePassword: function(){

      }
    },
    classMethods: {
      hashPassword: function(password, salt) {
        return cipher(this.password, salt, null);
      },
      signIn: function(email, password){
        return new Promise(function (resolve, reject) {
            User.findAll({where: {email: email}})
            .then(function(users) {
              if(users.length === 0) {
                reject("Not found");
                return;
              }  
              var userSalt = users[0].salt;
              var userPassword = users[0].password;
              User.hashPassword(userPassword, userSalt).then(function(hash){
                if((users[0].salt + hash) === users[0].salt + users[0].password){
                  resolve(users[0]);
                } else {
                  reject("Password does not match");
                }
              });
            })
            .catch(reject);
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
