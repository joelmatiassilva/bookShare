import React from 'react';
import {NavBarContainer} from './NavBar';
import ExploreBooksList from './ExploreBooksList';
import SearchBar from './SearchBar';
import {hashHistory} from 'react-router';
import BookList from './BookList'
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const Explore = class Explore extends React.Component{
  componentWillMount(){
    if(!localStorage.token){
      hashHistory.push('/signIn');
    }
    this.props.getExploreBooks();
  }
  render(){
    return <div className="explore">
      <NavBarContainer/>
      <h1>Welcome to Explore!</h1>
      <SearchBar/>
      <BookList books={this.props.books}/>
    </div>;
  }
}
function mapPropsToState(state){
  return {
    books: state.explore.get('books')
  }
}

export const ExploreContainer = connect(
  mapPropsToState,
  actionCreators
)(Explore);