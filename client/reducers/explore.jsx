import { Map } from 'immutable';
import Fuse from 'fuse.js';

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

function filterExploreFriendsBooks(state, filter){
  var friendBooks = state.get('books')
  // console.log("In filterBooks", filter, friendBooks)
  var fuse = new Fuse(friendBooks, { keys: ["title", "authors", "username"] });
  // console.log("fuse", fuse)
  var filteredBooks = fuse.search(filter)
  console.log("In filteredBook", filteredBooks)

  state = state.set('filter', filter);
  return state.set('filteredBooks', filteredBooks);
}

export default function(state = Map(), action){
  switch(action.type){
    case 'SET_STATE':
      return setState(state, action.state);
    case 'START_GETTING_EXPLORE_BOOKS':
      return startGettingExploreBooks(state);
    case 'FINISH_GETTING_EXPLORE_BOOKS':
      return finishGettingExploreBooks(state, action.books);
    case 'FILTER_EXPLORE_FRIENDS_BOOKS':
      return filterExploreFriendsBooks(state, action.filter);
    default:
      return setState(state);
  }
}
