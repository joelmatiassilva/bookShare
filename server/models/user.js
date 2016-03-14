'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    passwordHash: DataTypes.STRING
  });
  User.belongsToMany(models.UserBook, {through: 'UserBook'});
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
});

// there might be some convenient functions that sequelize
// automatically adds for you like this:
user.userBooks()

