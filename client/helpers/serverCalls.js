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