'use strict';
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User',
  { //Obj1
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  },

  { //Obj2: INSTANCE and CLASS Methods
    instanceMethods: {
      generateSalt: function(){
        this.salt = bcrypt.genSaltSync(10);
      },
      hashPassword: function(password) {
        return bcrypt.hashSync(password, this.salt);
      },

      comparePassword: function(password){
        var compare = Promise.promisify(bcrypt.compare);
          return compare(password, this.password);
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
    } //end classMethods;
  }

  );
  return User;
};

//TODO: add validations
