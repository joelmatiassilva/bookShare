import React from 'react';
import {BookListEntryContainer} from './BookListEntry';

class BookList extends React.Component{
  render(){
    return <div className="book-list">
      {this.props.books.map((book) => {
        return <BookListEntryContainer {...book} />
      })}
    </div>;
  }
}

export default BookList;