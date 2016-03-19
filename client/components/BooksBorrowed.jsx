import React from 'react';
import BookList from './BookList';

class BooksBorrowed extends React.Component{
  render(){
    return <div>
      This is the BooksBorrowed Component
      <BookList books={this.props.booksBorrowed}/>
    </div>
  }
}
export default BooksBorrowed;