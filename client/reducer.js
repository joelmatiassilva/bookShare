import {Map, List, fromJS} from 'immutable';
import {
  setPassword, 
  setPasswordConfirmation, 
  setUsername, 
  setEmail, 
  startSignIn,
  endSignIn,
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
    //authReducers
    case 'SET_USERNAME':
      return setUsername(state, action.username);
    case 'SET_PASSWORD':
      return setPassword(state, action.password);
    case 'SET_PASSWORD_CONFIRMATION':
      return setPasswordConfirmation(state, action.password);
    case 'SET_EMAIL':
      return setEmail(state, action.email);
    case 'REGULAR_LOGIN':
      return regularLogin(state);
    case 'REGULAR_SIGNUP':
      return regularSignUp(state);
    case 'START_SIGNIN':
      return startSignIn(state);
    case 'END_SIGNIN':
      return endSignIn(state, action.token);
    //dashboardReducers
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