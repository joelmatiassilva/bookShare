import {Map, List, fromJS} from 'immutable';

function setState(state, newState){
  return state.merge(newState);
}

function setPassword(state, password){
  return state.setIn(['userInfo','password'], password);
}

function setUsername(state, username){
  return state.setIn(['userInfo','username'], username);
}

function setEmail(state, username){
  return state.setIn(['userInfo','email'], username);
}

function setPasswordConfirmation(state, username){
  return state.setIn(['userInfo','passwordConfirmation'], username);
}

function regularLogin(state){
  //TODO make login GET request
  var username = state.getIn(['userInfo', 'username']);
  var password = state.getIn(['userInfo','password']);
}

function regularSignUp(state, info){
  var username = state.getIn(['userInfo', 'username']);
  var email = state.getIn(['userInfo','email']);
  var password = state.getIn(['userInfo','password']);
  var passwordConfirmation = state.getIn(['userInfo','passwordConfirmation']);
  console.log('Username:', username);
  console.log('email:', email);
  console.log('password:', password);
  console.log('passwordConfirmation:', passwordConfirmation);
}

function facebookLogin(state){
  //TODO make facebookLogin GET request
  $.ajax({
    url: '/login/facebook',
    method: 'POST',
    success: function(res){
      console.log(res);
    },
    error: function(err){
      console.error(err);
    }
  })
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'SET_PASSWORD':
      return setPassword(state, action.password);
    case 'SET_PASSWORD_CONFIRMATION':
      return setPasswordConfirmation(state, action.password);
    case 'SET_USERNAME':
      return setUsername(state, action.username);
    case 'SET_EMAIL':
      return setEmail(state, action.email);
    case 'REGULAR_LOGIN':
      return regularLogin(state);
    case 'REGULAR_SIGNUP':
      return regularSignUp(state);
    case 'FACEBOOK_LOGIN':
      return facebookLogin(state);
  }
}