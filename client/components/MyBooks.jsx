import React from 'react';
import BookList from './BookList';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

class MyBooks extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return <div>
      <h2>My Books</h2>
      <input type="text" placeholder="Search for a book" onChange={(event) =>{this.props.searchBooks(event.target)}}/>
      <h3>Found books from search: </h3>
      <BookList books={this.props.myBooks}/>
      <h3>Books that I own: </h3>
      <BookList books={this.props.myBooks}/>
    </div>
  }
}

function mapStateToProps(state){
  return {

  }
}

export const MyBooksContainer = connect(
  mapStateToProps,
  actionCreators
)

export default MyBooks;