function searchBooks(state, query){
  $.ajax({
    url: 'http://isbndb.com/api/v2/json/5MIPCZBD/books?q='+ query,
    success: function(res){
      var books = res.data;
      setFoundBooks(state, books);
    },
    error: function(err){
      console.error(err);
    }
  });
}

function setFoundBooks(state, foundBooks){
  return state.setIn(['dashboard','foundBooksISBNdb'], foundBooks);
}