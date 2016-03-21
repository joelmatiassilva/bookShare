'use strict';
module.exports = function(sequelize, DataTypes) {
  var BookRequest = sequelize.define('BookRequest', {
    // accepted: DataTypes.BOOLEAN,
    // dueDate: DataTypes.STRING,
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