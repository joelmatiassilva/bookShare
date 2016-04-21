import {searchGoogleBooksAJAX} from '../searchBooks';
import {
  getMyBooksAJAX,
  getBookRequestsToUserAJAX,
  acceptBookRequestAJAX,
  getBooksLentAJAX,
  getBooksBorrowedAJAX,
  addBookToMyShelfAJAX,
  rejectBookRequestAJAX,
  returnBookAJAX} from '../helpers/serverCalls';

export function setFoundBooks(foundBooks){
  return {
    type: 'SET_FOUND_BOOKS',
    foundBooks: foundBooks
  }
}

export function searchBooks(query){
  return {
    type: 'SEARCH_BOOKS',
    query: query
  }
}


/* Get books that I own async actions */
export function getMyBooks(){
  return function (dispatch){
    dispatch(startGettingMyBooks());
    return getMyBooksAJAX((response)=> {
      dispatch(finishGettingMyBooks(response));
    })
  }
}

export function startGettingMyBooks(){
  return {
    type: 'START_GET_MY_BOOKS'
  }
}

export function finishGettingMyBooks(books){
  return {
    type: 'FINISH_GET_MY_BOOKS',
    books: books
  }
}

/* addBookToMyShelf action */
export function addBookToMyShelf(book){
  return function(dispatch){
    return addBookToMyShelfAJAX(book, (res) => {
      dispatch(finishAddBookToMyShelf(book));
      dispatch(getMyBooks());
    });
  }
}

export function finishAddBookToMyShelf(book){
  return {
    type: 'FINISH_ADD_BOOK_TO_MY_SHELF',
    book: book
  }
}


export function requestBooks(query){
  console.log('REQUESTING BOOKS for query: ' + query);
  return {
    type: 'REQUEST_BOOKS',
    query: query
  }
}

export function receiveBooks(books){
  console.log('RECEIVING BOOKS');
  console.log(books);
  return {
    type: 'RECEIVE_BOOKS',
    books: books
  }
}

export function fetchBooks(query){
  return function(dispatch){
    if (query.length === 0) {
      dispatch(receiveBooks([]));
      return;
    }
    dispatch(requestBooks(query));
    return searchGoogleBooksAJAX(query, (res) => {
      dispatch(receiveBooks(res));
    });
  }
}

/* Borrow book / Create Book Request async */
export function startBookRequest(){
  return {
    type: 'START_BOOK_REQUEST'
  }
}

export function finishBookRequest(){
  return {
    type: 'FINISH_BOOK_REQUEST'
  }
}

export function borrowBook(data){
  return function(dispatch){
    dispatch(startBookRequest(data));
    return createBookRequestAJAX(data, (response) => {
      console.log('MADE BOOK REQUEST');
      console.log(response);
      dispatch(finishBookRequest());
    });
  }
}

export function startGettingBookRequestsToUser(){
  return {
    type: 'START_GETTING_BOOK_REQUESTS_TO_USER'
  }
}


export function finishGettingBookRequestsToUser(bookRequests){
  return {
    type: 'FINISH_GETTING_BOOK_REQUESTS_TO_USER',
    bookRequests: bookRequests
  }
}

export function getBookRequestsToUser(){
  return function(dispatch){
    console.log('Starting to get bookRequestsToUser');
    dispatch(startGettingBookRequestsToUser());
    return getBookRequestsToUserAJAX((bookRequests) => {
      console.log('GOT REQUESTS');
      console.log(bookRequests);
      dispatch(finishGettingBookRequestsToUser(bookRequests));
    });
  }
}

/* Actions to get book requests done to me */
export function startGettingBookRequestsToUser(){
  return {
    type: 'START_GETTING_BOOK_REQUESTS_TO_USER'
  }
}


export function finishGettingBookRequestsToUser(bookRequests){
  return {
    type: 'FINISH_GETTING_BOOK_REQUESTS_TO_USER',
    bookRequests: bookRequests
  }
}

export function getBookRequestsToUser(){
  return function(dispatch){
    console.log('Starting to get bookRequestsToUser');
    dispatch(startGettingBookRequestsToUser());
    return getBookRequestsToUserAJAX((bookRequests) => {
      console.log('GOT REQUESTS');
      console.log(bookRequests);
      dispatch(finishGettingBookRequestsToUser(bookRequests));
    });
  }
}

/* Actions to accept book requests */
export function startAcceptingBookRequest(){
  return {
    type: 'START_ACCEPTING_BOOK_REQUEST'
  }
}


export function finishAcceptingBookRequest(requestId){
  return {
    type: 'FINISH_ACCEPTING_BOOK_REQUEST',
    requestId: requestId
  }
}

export function acceptBookRequest(requestId){
  return function(dispatch){
    console.log('Starting to ACCEPT bookRequests');
    dispatch(startAcceptingBookRequest());
    return acceptBookRequestAJAX(requestId, (bookRequests) => {
      console.log('ACCEPTED BOOK REQUEST');
      console.log(bookRequests);
      dispatch(finishAcceptingBookRequest(requestId));
      dispatch(getBooksLent());
    });
  }
}


/* Actions to reject book requests */

export function finishRejectingBookRequest(requestId){
  return {
    type: 'FINISH_REJECT_BOOK_REQUEST',
    requestId: requestId
  }
}

export function rejectBookRequest(requestId){
  return function(dispatch){
    console.log('Starting to ACCEPT bookRequests');
    return rejectBookRequestAJAX(requestId, (bookRequests) => {
      console.log('REJECTED BOOK REQUEST');
      console.log(bookRequests);
      dispatch(finishRejectingBookRequest(requestId));
    });
  }
}



/* Action to get books lent */
export function startGettingBooksLent(){
  return {
    type: 'START_GETTING_BOOKS_LENT'
  }
}

export function finishGettingBooksLent(books){
  return {
    type: 'FINISH_GETTING_BOOKS_LENT',
    books: books
  }
}

export function getBooksLent(){
  return function(dispatch){
    dispatch(startGettingBooksLent());
    return getBooksLentAJAX((books) => {
      console.log('GOT BOOKS LENT: ');
      console.log(books);
      dispatch(finishGettingBooksLent(books));
    });
  }
}




/* Action to get books borrowed */
export function startGettingBooksBorrowed(){
  return {
    type: 'START_GETTING_BOOKS_BORROWED'
  }
}

export function finishGettingBooksBorrowed(books){
  return {
    type: 'FINISH_GETTING_BOOKS_BORROWED',
    books: books
  }
}

export function getBooksBorrowed(){
  return function(dispatch){
    dispatch(startGettingBooksBorrowed());
    return getBooksBorrowedAJAX((books) => {
      console.log('GOT BOOKS BORROWED: ');
      console.log(books);
      dispatch(finishGettingBooksBorrowed(books));
    });
  }
}


export function filterExploreFriendsBooks(filter){
  return {
    type: 'FILTER_EXPLORE_FRIENDS_BOOKS',
    filter: filter
  }
}

export function finishReturningBook(){
  return {
    type: 'FINISH_RETURNING_BOOK'
  }
}

export function returnBook(BookRequestId){
  return function(dispatch){
    return returnBookAJAX(BookRequestId, () => {
      dispatch(finishReturningBook());
      dispatch(getBooksBorrowed());
    });
  }
}
