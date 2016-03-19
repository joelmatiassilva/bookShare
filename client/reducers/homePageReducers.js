export function setPassword(state, password){
  return state.setIn(['userInfo','password'], password);
}

export function setPasswordConfirmation(state, username){
  return state.setIn(['userInfo','passwordConfirmation'], username);
}

export function setUsername(state, username){
  return state.setIn(['userInfo','username'], username);
}

export function setEmail(state, username){
  return state.setIn(['userInfo','email'], username);
}
