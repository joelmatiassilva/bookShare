'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserBook = sequelize.define('UserBook', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        console.log("SHARE-start")
        UserBook.belongsTo(models.User, {foreignKey: 'userId'});
        UserBook.belongsTo(models.Book, {foreignKey: 'bookId'});
        // console.log("SHARE-end")
      }
    }
  });
  return UserBook;
};

