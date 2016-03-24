'use strict';
var Promise = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {

  var User = sequelize.define('User',
  {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: DataTypes.STRING
  },

  {
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
        //FIXME: error adding more than one friend per user
        User.belongsToMany(models.User, {through: 'Friends', as: 'Friends', foreignKey: 'userId', constraints: false});
        User.belongsToMany(models.User, {through: 'Friends', as: 'Users', foreignKey: 'friendId', constraints: false});
        //User.hasMany(models.Friends, {foreignKey: 'userId', constraints: false});
      }
    }
  }

  );
  return User;
};

//TODO: add validations
