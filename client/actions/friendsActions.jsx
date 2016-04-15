import {
  makeFriendRequestAsync,
  getMyFriendRequests,
  getMyFriendsAJAX,
  searchUsersAJAX,
  acceptFriendRequestAJAX,
  createBookRequestAJAX,
  declineFriendRequestAJAX,
  getFriendBooksAJAX
} from '../helpers/serverCalls';

/* Make friend request */
export function makeFriendRequest(email){
  return dispatch => {
    return makeFriendRequestAsync(email, (response) => {
      console.log(response);
      dispatch(searchUsers(' '));
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
      dispatch(finishGettingFriendRequestToMe(friendRequests));
    });
  }
}

/* Get my friends async actions */
export function getMyFriends(){
  return function(dispatch){
    dispatch(startGettingMyFriends());
    return getMyFriendsAJAX((response) => {
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
    if (query.length === 0) {
      dispatch(finishSearchUsers(undefined));
      return;
    }
    console.log('Searching friends with query: ' + query);
    dispatch(startSearchUsers(query));
    return searchUsersAJAX(query,(response) => {
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


/* Accept friend request Async */
export function acceptFriendRequest(friendRequestID){
  console.log('Accepting friend request ID:', friendRequestID);
  return function(dispatch){
    dispatch(startAcceptFriendRequest());
    return acceptFriendRequestAJAX(friendRequestID, (response) => {
      console.log('Accepted friend request');
      console.log(response);
      dispatch(finishAcceptFriendRequest(friendRequestID));
      dispatch(getMyFriends());
    });
  }
}

export function startAcceptFriendRequest(){
  return {
    type: 'START_ACCEPT_FRIEND_REQUEST'
  }
}

export function finishAcceptFriendRequest(friendRequestId){
  return {
    type: 'FINISH_ACCEPT_FRIEND_REQUEST',
    friendRequestId: friendRequestId
  }
}

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

/* Decline friend requests async functions */
export function declineFriendRequest(friendRequestID){
  return function(dispatch){
    return declineFriendRequestAJAX(friendRequestID, (response) => {
      console.log('SUCCESSFULLY DECLINED FRIEND REQUEST', friendRequestID);
      dispatch(finishDeclineFriendRequest(friendRequestID));
    });
  }
}

export function finishDeclineFriendRequest(friendRequestId){
  return {
    type: 'FINISH_DECLINE_FRIEND_REQUEST',
    friendRequestId: friendRequestId
  }
}

/* View Friend's books actions */
export function viewFriendBooks(friendId){
  return function(dispatch){
    return getFriendBooksAJAX(friendId, (response) => {
      dispatch(finishGettingFriendBooks(response));
    })
  };
}

export function finishGettingFriendBooks(books){
  return {
    type: 'FINISH_GETTING_FRIEND_BOOKS',
    books: books
  }
}

