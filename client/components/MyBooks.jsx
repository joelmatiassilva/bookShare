import React from 'react';
import BookList from './BookList';

class MyBooks extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return <div>
      <h1>This is the MyBooks Component</h1>
      <input type="text" placeholder="Search for a book"/>
      <BookList books={this.props.myBooks}/>
    </div>
  }
}

export default MyBooks;