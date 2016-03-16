import {Map, List} from 'immutable';

function setState(state, newState){
  return state.merge(newState);
}

function regularLogin(state, info){
  //TODO make login GET request
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
    case 'REGULAR_LOGIN':
      return regularLogin(state, info);
    case 'FACEBOOK_LOGIN':
      return facebookLogin(state);
  }
}