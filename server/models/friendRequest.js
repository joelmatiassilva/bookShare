'use strict';
module.exports = function(sequelize, DataTypes) {
  var FriendRequest = sequelize.define('FriendRequest', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    accepted: DataTypes.BOOLEAN
  }, {
    hooks: { // B-A
      afterCreate: function(friendRequest, options) {
        console.log("afterCreate", friendRequest);
        if (friendRequest.accepted === true) {
          return FriendRequest.create({
            friendId: friendRequest.userId,
            userId: friendRequest.friendId,
            accepted: true,
          });
        }
      },
      afterUpdate: function(friendRequest, options) {
        if (friendRequest.accepted === true && !friendRequest.previous('accepted')) {
          return FriendRequest.create({
            friendId: friendRequest.userId,
            userId: friendRequest.friendId,
            accepted: true,
          });
        }
      }
    },
    classMethods: {
      associate: function(models){
        FriendRequest.belongsTo(models.User, {as: 'User', foreignKey: 'userId', constraints: false});
        FriendRequest.belongsTo(models.User, {as: 'Friend', foreignKey: 'friendId', constraints: false});
      }
    }
  });
  return FriendRequest;
};
