var models = require('../models');
var Book = models.Book;
var UserBook = models.UserBook;
var BookRequest = models.BookRequest;

module.exports.addBook = function(req, res){
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

module.exports.viewMyShelf = function(req, res){
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

module.exports.makeBookRequest = function(req, res) {
  BookRequest.create({
    bookId: req.body.bookId,
    ownerId: req.body.ownerId,
    borrowerId: req.body.borrowerId,
    accepted: false})
  .then(function() {
    res.status(201).end();
  })
  .catch(function(err) {
    res.status(500).json(err);
  });
};

module.exports.deleteBookRequest = function(req, res){
  BookRequest.findById(req.body.id)
  .then(function (request) {
    request.destroy();
    res.status(201).end();
  })
  .catch(function(err) {res.status(500).json(err);});
};

//pass due date in format YYYY/MM/DD
module.exports.acceptBookRequest = function(req, res){
  BookRequest.findById(req.body.id)
  .then(function (request) {
    request.update({accepted: true, dueDate: req.body.dueDate})
    .then(function () {
      res.status(201).end();
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json(err);});
};

//get book requests where the user is borrowing from another person
module.exports.getMyBookRequests = function(req, res) {
  models.sequelize.query('select b.id, b.isbn10, b.isbn13, b.authors, b.title,\
    b.description, b.image, b.categories, br.accepted, \
    br.id as BookRequestId from bookrequests as br inner\
  join books as b on br.bookId = b.id where br.borrowerId = ? and br.accepted = 0',
  { replacements: [req.currentUser.id.toString()], type: sequelize.QueryTypes.SELECT })
  .then(function (requests) {
    console.log(requests);
    res.status(200).json(requests);
  }).catch(function(err) {res.status(500).json(err);});
/*
  BookRequest.findAll({
    where: { accepted: false, borrowerId: req.currentUser.id}
  }).then(function (requests) {
    requests = requests.map(function (request) {
      return request.bookId;
    });
    Book.findAll({ where: { id: requests }})
    .then(function(books) {
      res.status(200).json(books);
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json(err);});*/
};

module.exports.getMyRequestedBooks = function(req, res) {

};

module.exports.viewMyBook= function(req, res){
// TODO
};

module.exports.viewFriendBooks= function(req, res){
// TODO
};

module.exports.viewFriendsBooks= function(req, res){
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

