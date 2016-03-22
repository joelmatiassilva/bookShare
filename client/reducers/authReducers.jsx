import {hashHistory} from 'react-router';

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

export function startSignIn(state){
  //TODO activate Spinner for better UX
  return state;
}

export function endSignIn(state, token){
  console.log('SET TOKEN TO :' + token);
  localStorage.setItem('token', token);
  hashHistory.push('/explore');
  return state.setIn(['userInfo', 'token'], token);
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
      if(res.token){
        setToken(state, res.token);
        hashHistory.push('/explore');
      }
    },
    error: function(err){
      console.log('ERROR, USER NOT LOGGED IN')
      console.error(err);
    }
  });
  return state;
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
  return state;
}