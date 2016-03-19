import React from 'react';
import BookListEntry from './BookListEntry';

class BookList extends React.Component{
  render(){
    return <div className="book-list">
      {this.props.books.map((book) =>{
        return <BookListEntry {...book}/>
      })}
    </div>;
  }
}

export default BookList;