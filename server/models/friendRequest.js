'use strict';
module.exports = function(sequelize, DataTypes) {
  var FriendRequest = sequelize.define('FriendRequest', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    accepted: DataTypes.BOOLEAN,
    userId: {
      type: DataTypes.INTEGER
    },
    friendId: {
      type: DataTypes.INTEGER
    }
  }, {
    classMethods: {
      associate: function(models){

      }
    }
  });
  return FriendRequest;
};
