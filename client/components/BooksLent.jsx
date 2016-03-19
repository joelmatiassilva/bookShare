import React from 'react';
import BookList from './BookList';

class BooksLent extends React.Component{
  render(){
    return <div>
      This is the BooksLent Component
      <BookList books={this.props.booksLent}/>
    </div>
  }
}
export default BooksLent;