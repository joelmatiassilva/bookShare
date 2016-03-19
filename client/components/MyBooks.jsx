import React from 'react';
import BookListEntry from './BookListEntry';

class MyBooks extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return <div>
      <h1>This is the MyBooks Component</h1>
    {this.props.myBooks.map((book) => {
      return <BookListEntry {...book} />
    })}
    </div>
  }
}

export default MyBooks;