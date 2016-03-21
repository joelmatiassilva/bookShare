var models = require('../models');
var Book = models.Book;
var UserBook = models.UserBook;

module.exports.addBook= function(req, res){
  Book.create(req.body)
    //FIXME: security: whitelist attributes
    //TODO: look up sequel transaction to deal with the limbo period
  .then(function(book) {
    req.currentUser.addBook(book).then(function(){
      res.status(201).json(book);
    }).catch(function(err){
      return res.status(500).json(err);
    });
  })
  .catch(function(err){
    return res.status(500).json(err);
  });

};

module.exports.viewMyShelf= function(req, res){
  req.currentUser.getBooks().then(function(books) {
    books = books.map(function(book) {
      return {
        isbn: book.id,
        author: book.authorm,
        title: book.title,
        description: book.description,
        image: book.image,
        genre: book.genre
      };
    });
    res.status(200).json(books);
  })
  .catch(function(err) {
    res.status(500).json(err);
  });

};

module.exports.viewMyBook= function(req, res){
// TODO
};

module.exports.viewFriendBooks= function(req, res){
// TODO
};

module.exports.viewFriendsBooks= function(req, res){
  // TODO
  req.currentUser.getFriends().then(function(friends) {
    var friendIds = friends.map(function(friend) { return friend.id; });

    Book.findAll({
      include: [
        {model: models.User, where: {id: friendIds}}
      ]
    }).then(function(books){

      books = books.map(function(book) {
        return {
          // friends is an array of users that have this book.
          friends: book.Users.map(function(user) {
            return {
              id: user.id,
              name: user.name
            };
          }),
          isbn: book.id,
          author: book.author,
          title: book.title,
          description: book.description,
          image: book.image,
          genre: book.genre
        };
      });
      console.log(books);
      res.status(200).json(books);
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json(err);
    });
  })
  .catch(function(err) {
    console.log(err);
    res.status(500).json(err);
  });
};

module.exports.viewFriendBook= function(req, res){
// TODO
};


module.exports.deleteBook= function(req, res){
//TODO
};

