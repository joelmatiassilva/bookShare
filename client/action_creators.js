import {searchGoogleBooksAJAX} from './searchBooks';
import {
  asyncSignIn, 
  getMyBooksAJAX, 
  getMyFriendsAJAX, 
  searchUsersAJAX, 
  makeFriendRequestAsync,
  getMyFriendRequests} from './helpers/serverCalls';

export function setState(state){
  return {
    type: 'SET_STATE',
    state
  };
}

/* -------- AUTHORIZATION ACTIONS -------- */

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

export function startRegularSignUp(){
  return {
    type: 'START_REGULAR_SIGNUP'
  }
}

export function finishRegularSignUp(token){
  return {
    type: 'FINISH_REGULAR_SIGNUP',
    token: token
  }
}

export function regularSignUp(){
  return {
    type: 'REGULAR_SIGNUP'
  }
}

export function startSignIn(username, password){
  return {
    type: 'START_SIGNIN',
    username: username,
    password: password
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

/* -------- DASHBOARD ACTIONS  -------- */

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

/* Make friend request */
export function makeFriendRequest(email){
  return dispatch => {
    return makeFriendRequestAsync(email, (response) => {
      console.log(response);
    });
  }
}

/* Get friendRequests done to me */
export function startGettingFriendRequestToMe(){
  return {
    type: 'START_GETTING_FRIEND_REQUESTS_TO_ME',
  }
}

export function finishGettingFriendRequestToMe(friendRequests){
  return {
    type: 'FINISH_GETTING_FRIEND_REQUESTS_TO_ME',
    friendRequests: friendRequests
  }
}

export function getFriendRequestsDoneToMe(){
  console.log('STARTING TO FETCH FRIEND REQUESTS DONE TO ME');
  return dispatch => {
    dispatch(startGettingFriendRequestToMe());
    return getMyFriendRequests((friendRequests) => {
      console.log('GOT THE FRIEND REQUESTS');
      console.log(friendRequests);
      dispatch(finishGettingFriendRequestToMe(friendRequests));
    });
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

/* Get my friends async actions */
export function getMyFriends(){
  return function(dispatch){
    dispatch(startGettingMyFriends());
    return getMyFriendsAJAX((response) => {
      console.log('GOT FRIENDS');
      console.log(response);
      dispatch(finishGettingMyFriends(response));
    });
  }
}

export function startGettingMyFriends(){
  return {
    type: 'START_GET_MY_FRIENDS'
  }
}

export function finishGettingMyFriends(friends){
  return {
    type: 'FINISH_GET_MY_FRIENDS',
    friends: friends
  }
}

/* Search for friends async actions */
export function searchUsers(query){
  return function(dispatch){
    console.log('Searching friends with query: ' + query);
    dispatch(startSearchUsers(query));
    return searchUsersAJAX(query,(response) => {
      console.log('FOUND THIS USERS: ');
      console.log(response);
      dispatch(finishSearchUsers(response));
    })
  }
}
export function startSearchUsers(query){
  return {
    type: 'START_SEARCH_USERS',
    query: query
  }
}

export function finishSearchUsers(users){
  return {
    type: 'FINISH_SEARCH_USERS',
    users: users
  }
}

/* addBookToMySheklf action */
export function addBookToMyShelf(book){
  return {
    type: 'ADD_BOOK_TO_SHELF',
    book: book
  }
}
/* Search for books async actions  */
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
    dispatch(requestBooks(query));
    return searchGoogleBooksAJAX(query, (res) => {
      dispatch(receiveBooks(res));
    });
  }
}



