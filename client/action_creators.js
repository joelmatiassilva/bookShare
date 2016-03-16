export function setState(state){
  return {
    type: 'SET_STATE',
    state
  };
}

export function regularLogin(loginInfo){
  return {
    type: 'REGULAR_LOGIN',
    loginInfo
  }
}


export function facebookLogin(){
  return {
    type: 'FACEBOOK_LOGIN'
  }
}