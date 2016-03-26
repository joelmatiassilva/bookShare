var models = require('../models');
var Book = models.Book;
var UserBook = models.UserBook;
var User = models.User;
var BookRequest = models.BookRequest;
var TradeRequest = models.TradeRequest;
var sequelize = require('sequelize');

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
        id: book.id,
        isbn10: book.isbn10,
        isbn13: book.isbn13,
        authors: book.authors,
        title: book.title,
        description: book.description,
        image: book.image,
        categories: book.categories
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
    borrowerId: req.currentUser.id,
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

//(USER requests from-> FRIEND)
module.exports.getRequestedBooksToFriends = function(req, res) {
  models.sequelize.query('select b.id, b.isbn10, b.isbn13, b.authors, b.title,\
    b.description, b.image, b.categories, br.accepted, u.username, u.email, u.id as userId, \
    br.id as BookRequestId from bookrequests as br inner\
  join books as b on br.bookId = b.id\
  inner join users as u on u.id = br.ownerId where br.borrowerId = ? and br.accepted = 0',
  { replacements: [req.currentUser.id.toString()], type: sequelize.QueryTypes.SELECT })
  .then(function (requests) {
    console.log(requests);
    res.status(200).json(requests);
  }).catch(function(err) {res.status(500).json(err);});
};

//(FRIEND requests from -> USER)
module.exports.getRequestedBooksToMe = function(req, res) {
  models.sequelize.query('select b.id, b.isbn10, b.isbn13, b.authors, b.title,\
    b.description, b.image, b.categories, br.accepted, u.username, u.email, u.id as userId, \
    br.id as BookRequestId from bookrequests as br inner\
  join books as b on br.bookId = b.id\
  inner join users as u on u.id = br.borrowerId where br.ownerId = ? and br.accepted = 0',
  { replacements: [req.currentUser.id.toString()], type: sequelize.QueryTypes.SELECT })
  .then(function (requests) {
    console.log(requests);
    res.status(200).json(requests);
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.getBorrowedBooks = function(req, res) {
  models.sequelize.query('select b.id, b.isbn10, b.isbn13, b.authors, b.title,\
    b.description, b.image, b.categories, br.accepted, u.username, u.email, u.id as userId, \
    br.id as BookRequestId from bookrequests as br inner\
  join books as b on br.bookId = b.id\
  inner join users as u on u.id = br.ownerId where br.borrowerId = ? and br.accepted = 1',
  { replacements: [req.currentUser.id.toString()], type: sequelize.QueryTypes.SELECT })
  .then(function (requests) {
    console.log(requests);
    res.status(200).json(requests);
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.getLentBooks = function(req, res) {
  models.sequelize.query('select b.id, b.isbn10, b.isbn13, b.authors, b.title,\
    b.description, b.image, b.categories, br.accepted, u.username, u.email, u.id as userId, \
    br.id as BookRequestId from bookrequests as br inner\
  join books as b on br.bookId = b.id\
  inner join users as u on u.id = br.borrowerId where br.ownerId = ? and br.accepted = 1',
  { replacements: [req.currentUser.id.toString()], type: sequelize.QueryTypes.SELECT })
  .then(function (requests) {
    console.log(requests);
    res.status(200).json(requests);
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.makeTradeRequest = function(req, res){
  TradeRequest.create({
    bookId: req.body.bookId,
    ownerId: req.body.ownerId,
    requesterId: req.currentUser.id,
    accepted: false})
  .then(function() {
    res.status(201).end();
  })
  .catch(function(err) {
    res.status(500).json(err);
  });
};

module.exports.deleteTradeRequest = function(req, res){
  TradeRequest.findById(req.body.id)
  .then(function (request) {
    request.destroy();
    res.status(201).end();
  })
  .catch(function(err) {res.status(500).json(err);});
};

module.exports.acceptTradeRequest = function(req, res){
  TradeRequest.findById(req.body.id)
  .then(function (request) {
    request.update({accepted: true, otherBookId: req.body.otherBook})
    .then(function () {
      res.status(201).end();
    }).catch(function(err) {res.status(500).json(err);});
  }).catch(function(err) {res.status(500).json(err);});
};

module.exports.completeTradeRequest = function(req, res){

  TradeRequest.findById(req.body.id)
  .then(function (request) {
    //switch books and delete request
    Book.findById(request.bookId)
    .then(function(ownerBook) {
      User.findById(request.requesterId)
      .then(function (requestUser) {
        requestUser.addBook(ownerBook);
        Book.findById(request.otherBookId)
        .then(function (tradeBook) {
          User.findById(request.ownerId)
          .then(function (ownerUser) {
            ownerUser.addBook(tradeBook);
            UserBook.findOne({ where : {}})
          })
        })
      })
    })
  })
res.status(201).end();
};

module.exports.getTradeRequestsToFriends = function(req, res){

};

module.exports.getTradeRequestsToMe = function(req, res){

};

module.exports.viewMyBook= function(req, res){
// TODO
};

module.exports.viewFriendBooks= function(req, res){
// TODO
};

module.exports.getAllBooksFromFriends = function (req, res) {
    models.sequelize.query('select b.id, b.isbn10, b.isbn13, b.authors, b.title,\
    b.description, b.image, b.categories, u.id as userId, u.username \
    from users as u \
    inner join friends as f on f.friendId = u.id \
    inner join userbooks as ub on ub.userId = f.friendId\
    inner join books as b on b.id = ub.bookId \
    where f.userId = ?',
  { replacements: [req.currentUser.id.toString()], type: sequelize.QueryTypes.SELECT })
  .then(function (requests) {
    console.log(requests);
    res.status(200).json(requests);
  }).catch(function(err) {res.status(500).json(err);});
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

