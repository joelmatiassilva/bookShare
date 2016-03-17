'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserBook = sequelize.define('UserBook', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        UserBook.belongsTo(models.User, {foreignKey: 'userId', constraints: false});
        UserBook.belongsTo(models.Book, {foreignKey: 'bookId', constraints: false});
      }
    }
  });
  return UserBook;
};

