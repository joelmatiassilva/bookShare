import React from 'react';
import BookListEntry from './BookListEntry';

class BooksLent extends React.Component{
  render(){
    return <div>
      This is the BooksLent Component
      {this.props.booksLent.map((book) => {
        return <BookListEntry {...book} />
      })}
    </div>
  }
}
export default BooksLent;