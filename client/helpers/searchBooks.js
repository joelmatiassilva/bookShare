import Keys from './keys';

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