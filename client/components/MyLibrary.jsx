import React from 'react';
import {NavBarContainer} from './NavBar';
import {MyBooksContainer} from './MyBooks';
import BooksLent from './BooksLent';
import BooksBorrowed from './BooksBorrowed';
import {BookRequestsToUser} from './BookRequestsToUser';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';


export const MyLibrary = class MyLibrary extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if(!localStorage.token){
      hashHistory.push('/signIn');
    }
    this.props.getBookRequestsToUser();
    this.props.getBooksLent();
    this.props.getBooksBorrowed();
  }
  componentWillUpdate(){
    console.log('Updating MyLibrary');
  }
  render(){
    return <div>
        <NavBarContainer/>
        <div className="innerDiv">
          <BookRequestsToUser bookRequests={this.props.bookRequestsToUser}/>
          <MyBooksContainer/>
          <BooksBorrowed booksBorrowed={this.props.booksBorrowed}/>
          <BooksLent booksLent={this.props.booksLent}/>
        </div>
      </div>

  }
}

function mapStateToProps(state){
  return {
    friends: state.myLibrary.get('friends'),
    foundUsers: state.myLibrary.get('foundUsers'),
    loading: state.myLibrary.getIn(['loading', 'foundUsers']),
    bookRequestsToUser: state.myLibrary.getIn(['bookRequests', 'toUser']),
    booksLent: state.myLibrary.get('booksLent'),
    booksBorrowed: state.myLibrary.get('booksBorrowed')
  }
}

export const MyLibraryContainer = connect(
  mapStateToProps,
  actionCreators
)(MyLibrary);



