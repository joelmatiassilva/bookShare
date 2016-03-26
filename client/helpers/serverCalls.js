import fetch from 'isomorphic-fetch'

var headers = {
  authorization: localStorage.token
}

export function asyncSignIn(usernameOrEmail, password, callback){
  $.ajax({
    url: '/api/signIn',
    method: 'POST',
    data: {usernameOrEmail: usernameOrEmail, password: password},
    success: callback,
    error: function(err){
      console.log('ERROR, USER NOT LOGGED IN');
      console.error(err);
    }
  });
}

export function getMyBooksAJAX(callback){
  $.ajax({
    url: '/api/books',
    method: 'GET',
    headers: headers,
    success: callback,
    error: function(err){
      console.log('ERROR while fetching my books');
      console.error(err);
    }
  });
}

export function getMyFriendsAJAX(callback){
  $.ajax({
    url: '/api/friends/',
    method: 'GET',
    headers: headers,
    success: callback,
    error: function(err){
      console.log('ERROR while fetching user\'s friends');
      console.error(err);
    }
  });
}

export function getMyFriendRequests(callback){
  $.ajax({
    url:'/api/friendRequests', 
    method: 'GET',
    headers: headers,
    success: callback,
    error: function(err){
      console.log('ERROR while fetching user\'s friend Requests');
      console.error(err);
    }
  });
}

export function makeFriendRequestAsync(email, callback){
  $.ajax({
    url: '/api/friendRequests',
    method: 'POST',
    headers: headers,
    data: {
      email: email 
    },
    success: function(res){
      console.log('makeFriendRequest Response: '); 
      console.log(res);
    },
    error: function(){
      console.log('makeFriendRequest Error: ');
    } 
  })
}

export function searchUsersAJAX(query, callback){
  $.ajax({
    url: '/api/findFriends/' + query,
    method: 'GET',
    headers: headers,
    success: callback,
    error: function(err){
      console.log('ERROR FINDING USERS WITH QUERY', query);
      console.error(err);
    }
  });
}

export function regularSignUpAJAX(data, callback){
  if(data.invalidData === true){
    callback(null, 'Form data is not valid');
  } 
  $.ajax({
    url: '/api/signUp',
    method: 'POST',
    data: { username: data.username, password: data.password, email: data.email },
    success: callback,
    error: function(err){
      console.log('ERROR, USER NOT SIGNED UP')
      console.error(err);
    }
  });
}

export function acceptFriendRequestAJAX(friendRequestID, callback){
  $.ajax({
    url: '/api/acceptFriendRequest',
    method: 'POST',
    data: { id: friendRequestID },
    headers: headers,
    success: callback,
    error: function(err){
      console.log('Error while accepting friendRequest');
      console.error(err);
    }
  });
}

export function createBookRequestAJAX(data, callback){
  console.log('creating book request with data:');
  console.log(data);
  $.ajax({
    url: '/api/bookRequest',
    method: 'POST',
    headers: headers,
    data: {
      bookId: data.bookId,
      ownerId: data.ownerId
    },
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while creating a book request');
      console.error(error);
    }
  });
}

export function getExploreBooksAJAX(callback){
  console.log('GETTING EXPLORE BOOKS');
  $.ajax({
    url: '/api/getAllBooksFromFriends',
    method: 'GET',
    headers: headers,
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while creating a book request');
      console.error(error);
    }
  });
}

export function getBookRequestsToUserAJAX(callback){
  console.log('BOOK REQUEST DONE TO ME');
  $.ajax({
    url: '/api/myRequestedBooks',
    method: 'GET',
    headers: headers,
    success: callback,
    error: function(error){
      console.error('serverCalls AJAX: Error while fetching book requests done to user');
      console.error(error);
    }
  });
}