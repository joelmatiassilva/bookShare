import React from 'react';
import BookListEntry from './BookListEntry';

class BooksBorrowed extends React.Component{
  render(){
    return <div>
      This is the BooksBorrowed Component
      {this.props.booksBorrowed.map((book) => {
        return <BookListEntry {...book} />
      })}
    </div>
  }
}
export default BooksBorrowed;