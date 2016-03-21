import {searchGoogleBooksAJAX} from './searchBooks';

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

export function regularSignUp(){
  return {
    type: 'REGULAR_SIGNUP'
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