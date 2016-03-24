'use strict';
module.exports = function(sequelize, DataTypes) {
  var Friends = sequelize.define('Friends', {}, {

        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER
      },
      friendId: {
        type: DataTypes.INTEGER
      }
    },
    /*hooks: {
      afterCreate: function(friends, options) {
        console.log("afterCreate", friends);
          return Friends.create({
            friendId: friends.userId,
            userId: friends.friendId,
          });
      },
      afterUpdate: function(friends, options) {
          return FriendRequest.create({
            friendId: friends.userId,
            userId: friends.friendId,
          });
      }
    },*/
    {
      classMethods: {
        associate: function(models) {
          Friends.belongsTo(models.User, {as: 'User', foreignKey: 'userId', constraints: false});
          Friends.belongsTo(models.User, {as: 'Friend', foreignKey: 'friendId', constraints: false});
        }
      }

  });
  return Friends;
};