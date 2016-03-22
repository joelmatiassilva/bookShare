import Keys from './keys';
export function searchBooks(query, callback){
  if(typeof query !== 'string') {
    console.error('Please type a string as the title to search for');
    return;
  }
  $.ajax({
    url: 'http://isbndb.com/api/v2/json/'+ Keys.ISBN_KEY+'/books?q='+query,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    data: {access_key: Keys.ISBN_KEY,index1:title, value1:'thief of time'},
    success: callback,
    error: function(err){
      console.error(err);
    }
  });
}

export function searchGoogleBooksAJAX(query, callback){
   if(typeof query !== 'string') {
    console.error('Please type a string as the title to search for');
    return;
  }
  $.ajax({
    url: 'https://www.googleapis.com/books/v1/volumes',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    data: {
      q: query,
      key: Keys.GOOGLE_BOOKS_KEY
    },
    success: callback,
    error: function(err){
      console.error(err);
    }
  });
}