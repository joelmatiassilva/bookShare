'use strict';
module.exports = function(sequelize, DataTypes) {
  var Friends = sequelize.define('Friends', {
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Friends.belongsTo(models.User, {foreignKey: 'userId', constraints: false});
        Friends.belongsTo(models.User, {foreignKey: 'friendId', constraints: false});
      }
    }
  });
  return Friends;
};