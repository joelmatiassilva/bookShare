export function setPassword(state, password){
  return state.setIn(['userInfo','password'], password);
}

export function setPasswordConfirmation(state, username){
  return state.setIn(['userInfo','passwordConfirmation'], username);
}

export function setUsername(state, username){
  return state.setIn(['userInfo','username'], username);
}

export function setEmail(state, email){
  return state.setIn(['userInfo','email'], email);
}



export function regularLogin(state){
  //TODO make login GET request
  var email = state.getIn(['userInfo', 'email']);
  var password = state.getIn(['userInfo','password']);
  console.log('email: ' + email);
  console.log('PASSWORD: ' + password);
  $.ajax({
    url: '/api/signIn',
    method: 'POST', //TODO change EMAIL to something generic when we allow users to login with either username or email
    data: {email: email, password: password},
    success: function(res){
      console.log(res);
      console.log('GOT RESPONSE, USER LOGGED IN');
    },
    error: function(err){
      console.log('ERROR, USER NOT LOGGED IN')
      console.error(err);
    }
  });
}

export function regularSignUp(state, info){
  var username = state.getIn(['userInfo', 'username']);
  var email = state.getIn(['userInfo','email']);
  var password = state.getIn(['userInfo','password']);
  var passwordConfirmation = state.getIn(['userInfo','passwordConfirmation']);
  if(password !== passwordConfirmation) return state.set('errorMessage', 'Passwords do not match');
    $.ajax({
      url: '/api/signUp',
      method: 'POST',
      data: {username: username, password: password, email: email},
      success: function(res){
        console.log('GOT RESPONSE, USER SIGNED UP')
      },
      error: function(err){
        console.log('ERROR, USER NOT SIGNED UP')
        console.error(err);
      }
    });
}