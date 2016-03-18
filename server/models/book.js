'use strict';
module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    isbn: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    genre: DataTypes.STRING
  }, {
    instanceMethods: {
      viewMyShelf: function(){}, //TODO
      viewFriendsBooks: function(){}, //TODO
      deleteBook: function(){} //TODO
    },
    classMethods: {
      associate: function(models){
        Book.belongsToMany(models.User, {through:'UserBook', foreignKey: 'bookId', constraints: false});
      }
    }
  });
  return Book;
};
