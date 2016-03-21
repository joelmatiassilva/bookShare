import React from 'react';
import BookList from './BookList';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const MyBooks = class MyBooks extends React.Component{
  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  getBooks(){
    return this.props.foundBooks || [];
  }
  render(){
    return <div>
      <h2>My Books</h2>
      <input type="text" placeholder="Search for a book" onChange={(event) =>{this.props.fetchBooks(event.target.value)}}/>
      <h3>Found books from search: </h3>
      {this.getBooks().length > 0 ? <BookList books={this.getBooks()}/> : null}
      <h3>Books that I own: </h3>
      <BookList books={this.props.myBooks}/>
    </div>
  }
}

function mapStateToProps(state){
  var books = state ? state.getIn(['dashboard', 'foundBooks']) : [];
  return {
    foundBooks: books
  }
}

export const MyBooksContainer = connect(
  mapStateToProps,
  actionCreators
)(MyBooks);
