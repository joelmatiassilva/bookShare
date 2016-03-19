import React from 'react';
import BookList from './BookList';

class BooksLent extends React.Component{
  render(){
    return <div>
      <h2>Books that I lent to friends</h2>
      <BookList books={this.props.booksLent}/>
    </div>
  }
}
export default BooksLent;