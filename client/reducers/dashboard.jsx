import {searchGoogleBooksAJAX} from '../searchBooks';
import {Map} from 'immutable'

function setState(state = Map(), newState){
  return state.merge(newState);
}

function startGettingMyFriends(state){
  //TODO start spinner
  return state;
}

function finishGettingMyFriends(state, friends){
  return state.set('friends', friends);
}

function getMyBooks(state){
  return state;
}

function finishGetMyBooks(state, books){
  return state.set('myBooks', books);
}

function formatBooksResponse(response){
  if(!response.hasOwnProperty('items')) {
      console.error('No items found for that query');
      return;
  }
    var books = [];
    var currentBook = {};
    var isbn10, isbn13, image;
    for(var i=0;i<response.items.length; i++){
      var info = response.items[i].volumeInfo;
      if(info){
        var identifiers = info.industryIdentifiers;
        isbn10 = null, 
        isbn13 = null;
        if(identifiers && identifiers[1] && identifiers[1].type === 'ISBN_10'){
          isbn10 = identifiers[1].identifier;
        }
        if(identifiers && identifiers[0] && identifiers[0].type === 'ISBN_13'){
          isbn13 = identifiers[0].identifier;
        }
        if(info.imageLinks){
          image = info.imageLinks.thumbnail;
        }
        currentBook = {
          title: info.title,
          description: info.description,
          authors: JSON.stringify(info.authors),
          categories: JSON.stringify(info.categories),
          image: image,
          isbn10: isbn10,
          isbn13: isbn13,
          searchedBook: true
        }
        books.push(currentBook);
      }
    }
  return books;
}

//TODO make this function async
function addBookToMyShelf(state, book){
  if(book.title === null || book.title === undefined) return;
  var bookToSave = {
    authors: book.authors,
    categories: book.categories,
    description: book.description,
    isbn10: book.isbn10,
    isbn13: book.isbn13,
    image: book.image,
    title: book.title,
  }
  console.log(bookToSave);
  $.ajax({
    url: '/api/books',
    method: 'POST',
    data: bookToSave,
    headers: {
      authorization: localStorage.token
    },
    success: function(res){
      console.log(res);
      console.log('Sucessfully added book');
    },
    error: function(err){
      console.error('Error saving book');
      console.error(err);
    }
  });
  return state;
}

function requestBooks(state, query){
  //TODO set message or spinner to show user that we are fetching the books
  return state;
}

function receiveBooks(state, books){
  //TODO stop spinner or hide fetching message
  var formattedBooks = formatBooksResponse(books);
  return state.set('foundBooks', formattedBooks);
}

function setFoundBooks(state, foundBooks){
  return state.set('foundBooks', foundBooks);
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'ADD_BOOK_TO_SHELF':
      return addBookToMyShelf(state, action.book);
    case 'SET_FOUND_BOOKS':
      return setFoundBooks(state, action.foundBooks);
    case 'REQUEST_BOOKS':
      return requestBooks(state, action.query);
    case 'RECEIVE_BOOKS':
      return receiveBooks(state, action.books);
    case 'START_GET_MY_BOOKS':
      return getMyBooks(state);
    case 'FINISH_GET_MY_BOOKS':
      return finishGetMyBooks(state, action.books);
    case 'FINISH_GET_MY_FRIENDS':
      return finishGettingMyFriends(state, action.friends)
    default:
      return setState(state);
  }
}



