'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    instanceMethods: {
      signIn: function(){}, //TODO
      logout: function(){}, //TODO
      // addFriend: function(){}, //TODO
      // viewAllFriends: function(){}, //TODO
      // viewFriend: function(){} //TODO
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
