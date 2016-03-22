import {hashHistory} from 'react-router';
import {Map} from 'immutable';

function setState(state = Map(), newState){
  return state.merge(newState);
}

function setPassword(state, password){
  return state.setIn(['userInfo','password'], password);
}

function setPasswordConfirmation(state, username){
  return state.setIn(['userInfo','passwordConfirmation'], username);
}

function setUsername(state, username){
  return state.setIn(['userInfo','username'], username);
}

function setEmail(state, email){
  return state.setIn(['userInfo','email'], email);
}

function startSignIn(state){
  //TODO activate Spinner for better UX
  return state;
}

function endSignIn(state, token){
  console.log('SET TOKEN TO :' + token);
  localStorage.setItem('token', token);
  hashHistory.push('/explore');
  return state.setIn(['userInfo', 'token'], token);
}

function regularLogin(state){
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

function regularSignUp(state, info){
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
        localStorage.setItem('token', res.token);
        hashHistory.push('/explore');
        console.log('GOT RESPONSE, USER SIGNED UP')
      },
      error: function(err){
        console.log('ERROR, USER NOT SIGNED UP')
        console.error(err);
      }
    });
  return state;
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
    case 'REGULAR_LOGIN':
      return regularLogin(state);
    case 'REGULAR_SIGNUP':
      return regularSignUp(state);
    case 'START_SIGNIN':
      return startSignIn(state);
    case 'END_SIGNIN':
      return endSignIn(state, action.token);
    default:
      return setState(state);
  }
}













