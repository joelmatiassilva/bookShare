'use strict';
module.exports = function(sequelize, DataTypes) {
  var BookRequest = sequelize.define('BookRequest', {
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
    dueDate: DataTypes.DATEONLY,
    bookId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
    ownerId: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
    borrowerId: {
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
  return BookRequest;
};

/* Is it better to have 2 tables
id:
borrowerId: Fkey-User
userId: Fkey-User
bookId: Fkey-Book
accept:


*/