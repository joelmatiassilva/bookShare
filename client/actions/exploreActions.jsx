import {
  getExploreBooksAJAX} from '../helpers/serverCalls';


/* Get all books from my friends functions async */

export function setState(state){
  return {
    type: 'SET_STATE',
    state
  };
}
export function clearState(){
  return {
    type: 'CLEAR_STATE'
  }
}


/* Search for books async actions  */
export function startGettingExploreBooks(){
  return {
    type: 'START_GETTING_EXPLORE_BOOKS'
  }
}

export function finishGettingExploreBooks(books){
  return {
    type: 'FINISH_GETTING_EXPLORE_BOOKS',
    books: books
  }
}

export function getExploreBooks(){
  return function(dispatch){
    // dispatch(startGettingExploreBooks());
    return getExploreBooksAJAX((books) => {
      console.log('GOT BOOKS');
      console.log(books);
      dispatch(finishGettingExploreBooks(books));
    });
  }
}

