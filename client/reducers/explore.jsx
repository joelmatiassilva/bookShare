import { Map } from 'immutable';

function setState(state = Map(), newState){
  return state.merge(newState);
}

function startGettingExploreBooks(state){
  //TODO start spinner
  return state;
}

function finishGettingExploreBooks(state, books){
  //TODO stop spinner
  console.log('CHANGIN STATE TO HAVE ', books.length, ' books');
  console.log(books);
  return state.set('books', books);
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'START_GETTING_EXPLORE_BOOKS':
      return startGettingExploreBooks(state);
    case 'FINISH_GETTING_EXPLORE_BOOKS':
      return finishGettingExploreBooks(state, action.books);
    default:
      return setState(state);
  }
}