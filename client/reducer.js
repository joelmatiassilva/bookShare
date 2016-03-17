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

function regularLogin(state, info){
  //TODO make login GET request
  var username = state.getIn(['userInfo', 'username']);
  var password = state.getIn(['userInfo','password']);
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
    case 'SET_USERNAME':
      return setUsername(state, action.username);
    case 'REGULAR_LOGIN':
      return regularLogin(state);
    case 'FACEBOOK_LOGIN':
      return facebookLogin(state);
  }
}