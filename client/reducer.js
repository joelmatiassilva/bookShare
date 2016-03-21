import {Map, List, fromJS} from 'immutable';
// import {searchBooks} from './searchBooks';
import {
  setPassword, 
  setPasswordConfirmation, 
  setUsername, 
  setEmail, 
  setToken,
  regularLogin, 
  regularSignUp} from './reducers/authReducers';
import {
  setFoundBooks,
  requestBooks,
  receiveBooks,
  addBookToMyShelf} from './reducers/dashboardReducers';

function setState(state = Map(), newState){
  return state.merge(newState);
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'SET_USERNAME':
      return setUsername(state, action.username);
    case 'SET_PASSWORD':
      return setPassword(state, action.password);
    case 'SET_PASSWORD_CONFIRMATION':
      return setPasswordConfirmation(state, action.password);
    case 'SET_EMAIL':
      return setEmail(state, action.email);
    case 'SET_TOKEN':
      return setToken(state, action.token);
    case 'REGULAR_LOGIN':
      return regularLogin(state);
    case 'REGULAR_SIGNUP':
      return regularSignUp(state);
    case 'ADD_BOOK_TO_SHELF':
      return addBookToMyShelf(state, action.book);
    case 'SET_FOUND_BOOKS':
      return setFoundBooks(state, action.foundBooks);
    case 'REQUEST_BOOKS':
      return requestBooks(state, action.query);
    case 'RECEIVE_BOOKS':
      return receiveBooks(state, action.books);
  }
}