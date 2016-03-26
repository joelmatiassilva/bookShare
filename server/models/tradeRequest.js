'use strict';
module.exports = function(sequelize, DataTypes) {
  var TradeRequest = sequelize.define('TradeRequest', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
    accepted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    bookId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
    otherBookId: {
        allowNull: true,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
    ownerId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
    requesterId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      }
  }, {
    instanceMethods: {
      //TODO
    },
    classMethods: {
      associate: function(models){
        // Book.belongsToMany(models.User, {through:'UserBook', foreignKey: 'Book_userId'});
      }
    }
  });
  return TradeRequest;
};