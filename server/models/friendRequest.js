'use strict';
module.exports = function(sequelize, DataTypes) {
  var FriendRequest = sequelize.define('FriendRequest', {
    accepted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models){
        FriendRequest.belongsTo(models.User, {as: 'User', foreignKey: 'userId', constraints: false});
        FriendRequest.belongsTo(models.User, {as: 'Friend', foreignKey: 'friendId', constraints: false});
      }
    }
  });
  return FriendRequest;
};
