import Keys from './keys';
export function searchBooks(query, callback){
  if(typeof title !== 'string') {
    console.error('Please type a string as the title to search for');
    return;
  }
  $.ajax({
    url: 'http://isbndb.com/api/v2/json/'+ Keys.ISBN_KEY+'/books?q='+query,
    data: {access_key: Keys.ISBN_KEY,index1:title, value1:'thief of time'},
    success: callback,
    error: function(err){
      console.error(err);
    }
  });
}