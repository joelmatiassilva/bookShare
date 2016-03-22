import React from 'react';
import BookList from './BookList';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import DebounceInput from 'react-debounce-input';

export const MyBooks = class MyBooks extends React.Component{
  constructor(props){
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  getBooks(){
    return this.props.foundBooks || [];
  }
  componentWillMount(){
    this.props.getMyBooks();
  }
  render(){
    return <div>
      <h2>My Books</h2>
      <DebounceInput debounceTimeout={200} type="text" placeholder="Search for a book" onChange={(event) =>{this.props.fetchBooks(event.target.value)}}/>
      <h3>Found books from search: </h3>
      {this.getBooks().length > 0 ? <BookList books={this.getBooks()}/> : null}
      <h3>Books that I own: </h3>
      {this.props.myBooks ? <BookList books={this.props.myBooks}/> : null}
    </div>
  }
}

function mapStateToProps(state){
  return {
    foundBooks: state.dashboard.getIn(['dashboard', 'foundBooks']),
    myBooks: state.dashboard.getIn(['dashboard','myBooks'])
  }
}

export const MyBooksContainer = connect(
  mapStateToProps,
  actionCreators
)(MyBooks);
