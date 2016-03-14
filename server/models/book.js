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
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        console.log("BOOK-start");
        Book.hasMany(models.UserBook, {foreignKey:'bookId'})
        // Book.belongsToMany(models.User, {
        //   through: { //for many to many relationships
        //     model: models.UserBook,
        //     // unique: true,
        //   },
        //   // foreignKey: 'bookId',
        //   // constraints: false
        // });
        console.log("BOOK-end");
      }
    }
  });

  return Book;
};