import {searchGoogleBooksAJAX} from '../searchBooks';


function formatBooksResponse(response){
  if(!response.hasOwnProperty('items')) {
      console.error('No items found for that query');
      return;
  }
    var books = [];
    var currentBook = {};
    var isbn10, isbn13, image;
    for(var i=0;i<response.items.length; i++){
      var info = response.items[i].volumeInfo;
      if(info){
        var identifiers = info.industryIdentifiers;
        isbn10 = null, 
        isbn13 = null;

        if(identifiers && identifiers[1] && identifiers[1].type === 'ISBN_10'){
          isbn10 = identifiers[1].identifier;
        }
        if(identifiers && identifiers[0] && identifiers[0].type === 'ISBN_13'){
          isbn13 = identifiers[0].identifier;
        }
        if(info.imageLinks){
          image = info.imageLinks.thumbnail;
        }
        currentBook = {
          title: info.title,
          description: info.description,
          authors: JSON.stringify(info.authors),
          categories: JSON.stringify(info.categories),
          imageUrl: image,
          isbn10: isbn10,
          isbn13: isbn13,
          searchedBook: true
        }
        books.push(currentBook);
      }
    }
  return books;
}


export function requestBooks(state, query){
  //TODO set message or spinner to show user that we are fetching the books
  return state;
}

export function receiveBooks(state, books){
  //TODO stop spinner or hide fetching message
  console.log('FOUND BOOKS: ');
  console.log(books);
  var formattedBooks = formatBooksResponse(books);
  console.log('FORMATTED BOOKS: ');
  console.log(formattedBooks);
  return state.setIn(['dashboard', 'foundBooks'], formattedBooks);
}

export function setFoundBooks(state, foundBooks){
  console.log('Found some books: ');
  console.log(foundBooks);
  return state.setIn(['dashboard','foundBooks'], foundBooks);
}