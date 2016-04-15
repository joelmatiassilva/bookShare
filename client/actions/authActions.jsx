import {searchGoogleBooksAJAX} from './searchBooks';
import {
  asyncSignIn,
  regularSignUpAJAX} from './helpers/serverCalls';


export function setState(state){
  return {
    type: 'SET_STATE',
    state
  };
}
export function clearState(){
  return {
    type: 'CLEAR_STATE'
  };
}

export function setPassword(password){
  return {
    type: 'SET_PASSWORD',
    password: password
  };
}

export function setPasswordConfirmation(password){
  return {
    type: 'SET_PASSWORD_CONFIRMATION',
    password: password
  };
}

export function setUsername(username){
  return {
    type: 'SET_USERNAME',
    username: username
  };
}

export function setEmail(email){
  return {
    type: 'SET_EMAIL',
    email: email
  };
}

export function regularLogin(){
  return {
    type: 'REGULAR_LOGIN'
  };
}

export function setToken(token){
  return {
    type: 'SET_TOKEN',
    token: token
  };
}

export function startRegularSignUp(userData){
  return {
    type: 'START_REGULAR_SIGNUP',
    userData: userData
  };
}

export function finishRegularSignUp(token){
  return {
    type: 'FINISH_REGULAR_SIGNUP',
    token: token
  };
}

export function regularSignUp(userData){
  return function(dispatch){
    dispatch(startRegularSignUp(userData));
    regularSignUpAJAX(userData, (data, errorData) =>{
      dispatch(finishRegularSignUp(data));
    });
  }
}

export function startSignIn(username, password){
  return {
    type: 'START_SIGNIN',
    username: username,
    password: password
  };
}

export function endSignIn(token, username){
  return {
    type: 'END_SIGNIN',
    token: token,
    username: username
  };
}

export function regularSignIn(username, password){
  return function(dispatch){
    dispatch(startSignIn(username, password));
    return asyncSignIn(username, password, (res) => {
      dispatch(endSignIn(res.token, res.username));
    });
  }
}

export function facebookLogin(){
  return {
    type: 'FACEBOOK_LOGIN'
  };
}
