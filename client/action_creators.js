export function setState(state){
  return {
    type: 'SET_STATE',
    state
  };
}

export function regularLogin(){
  return {
    type: 'REGULAR_LOGIN'
  }
}


export function facebookLogin(){
  return {
    type: 'FACEBOOK_LOGIN'
  }
}

export function setPassword(password){
  return {
    type: 'SET_PASSWORD',
    password: password
  }
}

export function setUsername(username){
  return {
    type: 'SET_USERNAME',
    username: username
  }
}