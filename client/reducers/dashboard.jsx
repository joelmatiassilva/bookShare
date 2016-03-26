import {searchGoogleBooksAJAX} from '../searchBooks';
import {Map} from 'immutable'
import {isNullUndefinedOrEmpty} from '../helpers/util';

function setState(state = Map(), newState){
  return state.merge(newState);
}

function clearState(state){
  return Map();
}

function startGettingMyFriends(state){
  //TODO start spinner
  state.setIn(['loading','myFriends']);
  return state;
}

function finishGettingMyFriends(state, friends){
  return state.set('friends', friends);
}

function getMyBooks(state){
  return state.setIn(['loading', 'myBooks'], true);
}

function finishGetMyBooks(state, books){
  state.setIn(['loading', 'myBooks'], false);
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
  if(isNullUndefinedOrEmpty(query)){
    state = state.setIn(['loading', 'foundBooks'], false)
  } else {
    state = state.setIn(['loading', 'foundBooks'], true)
  }
  return state;
}

function receiveBooks(state, books){
  //TODO stop spinner or hide fetching message
  console.log('FINISHED LOADING');
  var newState = state.setIn(['loading', 'foundBooks'], false);
  var formattedBooks = formatBooksResponse(books);
  return newState.set('foundBooks', formattedBooks);
}

function setFoundBooks(state, foundBooks){
  return state.set('foundBooks', foundBooks);
}


function startSearchUsers(state, query){
  if(isNullUndefinedOrEmpty(query)){
    state = state.setIn(['loading', 'foundUsers'], false); 
  } else {
    state = state.setIn(['loading', 'foundUsers'], true); 
  }
  return state;
}

function finishSearchUsers(state, users){
  state = state.setIn(['loading', 'foundUsers'], false);
  return state.set('foundUsers', users);
}

function finishGettingFriendRequestToMe(state, friendRequests){
  return state.set('friendRequests', friendRequests);
}


/* Make book request reducers  */
function startBookRequest(state){
  //TODO Start spinner
  return state;
}

function finishBookRequest(state){
  //TODO Stop spinner
  return state;
}

function startGettingBookRequestsToUser(state){
  //TODO start spinner
  return state;
}

function finishGettingBookRequestsToUser(state, bookRequests){
  return state.setIn(['bookRequests','toUser'], bookRequests);
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'CLEAR_STATE':
      return clearState(state);
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
      return finishGettingMyFriends(state, action.friends);
    case 'START_SEARCH_USERS':
      return startSearchUsers(state, action.query);
    case 'FINISH_SEARCH_USERS':
      return finishSearchUsers(state, action.users);
    case 'FINISH_GETTING_FRIEND_REQUESTS_TO_ME':
      return finishGettingFriendRequestToMe(state, action.friendRequests);
    case 'START_BOOK_REQUEST':
      return startBookRequest(state);
    case 'FINISH_BOOK_REQUEST':
      return finishBookRequest(state);
    case 'START_GETTING_BOOK_REQUESTS_TO_USER':
      return startGettingBookRequestsToUser(state);
    case 'FINISH_GETTING_BOOK_REQUESTS_TO_USER':
      return finishGettingBookRequestsToUser(state, action.bookRequests);
    default:
      return setState(state);
  }
}

