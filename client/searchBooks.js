import Keys from './keys';
export function searchBooks(title,callback){
  if(typeof title !== 'string') {
    reutrn
  }
  $.ajax({
    url: 'http://isbndb.com/api/books.xml',
    data: {access_key: Keys.ISBN_KEY,index1:title, value1:'thief of time'},
    success: callback,
    error: function(err){
      console.error(err);
    }
  });
}