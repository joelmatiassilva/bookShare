import React from 'react';
import BookList from './BookList';

class BooksBorrowed extends React.Component{
  render(){
    return <div>
      <h2>Books that I borrowed from my friends</h2>
      <BookList books={this.props.booksBorrowed}/>
    </div>
  }
}
export default BooksBorrowed;