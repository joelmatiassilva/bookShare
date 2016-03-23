
export function asyncSignIn(email, password, callback){
  $.ajax({
    url: '/api/signIn',
    method: 'POST',
    data: {email: email, password: password},
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
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.log('ERROR, USER NOT LOGGED IN');
      console.error(err);
    }
  });
}


export function getMyFriendsAJAX(callback){
  $.ajax({
    url: '/api/friends/',
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.log('ERROR, USER NOT LOGGED IN');
      console.error(err);
    }
  });
}

export function searchUsersAJAX(query, callback){
  $.ajax({
    url: '/api/findFriends/' + query,
    method: 'GET',
    headers: {
      authorization: localStorage.token
    },
    success: callback,
    error: function(err){
      console.log('ERROR FINDING USERS WITH QUERY', query);
      console.error(err);
    }
  });
}