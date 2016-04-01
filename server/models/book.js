'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    isbn10: DataTypes.STRING,
    isbn13: DataTypes.STRING,
    authors: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    categories: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models){
        Book.belongsToMany(models.User, { through:'UserBook', foreignKey: 'bookId', constraints: false });
        Book.hasMany(models.UserBook, {foreignKey: 'bookId', constraints: false});
      }
    }
  });
  return Book;
};

