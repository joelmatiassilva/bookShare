import {searchGoogleBooksAJAX} from './searchBooks';
import {asyncSignIn} from './helpers/serverCalls';

export function setState(state){
  return {
    type: 'SET_STATE',
    state
  };
}

/* -------- Authorization Actions -------- */

export function setPassword(password){
  return {
    type: 'SET_PASSWORD',
    password: password
  }
}

export function setPasswordConfirmation(password){
  return {
    type: 'SET_PASSWORD_CONFIRMATION',
    password: password
  }
}

export function setUsername(username){
  return {
    type: 'SET_USERNAME',
    username: username
  }
}

export function setEmail(email){
  return {
    type: 'SET_EMAIL',
    email: email
  }
}

export function regularLogin(){
  return {
    type: 'REGULAR_LOGIN'
  }
}

export function setToken(token){
  return {
    type: 'SET_TOKEN',
    token: token
  }
}

export function regularSignUp(){
  return {
    type: 'REGULAR_SIGNUP'
  }
}

export function startSignIn(){
  return {
    type: 'START_SIGNIN'
  }
}

export function endSignIn(token){
  return {
    type: 'END_SIGNIN',
    token: token
  }
}

export function regularSignIn(username, password){
  console.log('Username: ' + username + ' Password: ' + password );
  return function(dispatch){
    dispatch(startSignIn(username, password));
    return asyncSignIn(username, password, (res) => {
      console.log('TOKEN:',res.token);
      dispatch(endSignIn(res.token));
    });
  }
}

export function facebookLogin(){
  return {
    type: 'FACEBOOK_LOGIN'
  }
}

/* -------- Dashboard Actions  -------- */

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

export function addBookToMyShelf(book){
  return {
    type: 'ADD_BOOK_TO_SHELF',
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
  return {
    type: 'RECEIVE_BOOKS',
    books: books
  }
}

export function fetchBooks(query){
  return function(dispatch){
    dispatch(requestBooks(query));
    return searchGoogleBooksAJAX(query, (res) => {
      dispatch(receiveBooks(res));
    });
  }
}

