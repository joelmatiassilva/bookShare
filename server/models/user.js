'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        console.log("USER-start");
        User.hasMany(models.UserBook, {foreignKey: 'userId'});
        // User.belongsToMany(models.Book, {
        //   through: { //for many to many relationships
        //     model: models.UserBook,
        //     // unique: true,
        //   },
        //   // foreignKey: 'userId',
        //   // constraints: false
        // });
        console.log("USER-end");
      }
    }
  });
  return User;
};


// TODO: PUT IN CONTROLLER
// This finds all books that a user owns in 2 steps
// 1 - find the UserBooks (join table records)
// 2 - find the Books for each UserBook
UserBook.findAll({
  where: {userId: 1}
}).then(function(userBooks) {
  bookIds = userBooks.map(function(ub) { return ub.bookId });
  Book.findAll({
    where: {id: bookIds}
  }).then(function(books) {
    res.json(books)
  })
})

// there might be some convenient functions that sequelize
// automatically adds for you like this:
user.userBooks()

