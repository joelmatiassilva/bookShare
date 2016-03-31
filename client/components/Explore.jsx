import React from 'react';
import {NavBarContainer} from './NavBar';
import {SearchBarContainer} from './SearchBar';
import ExploreBooksList from './ExploreBooksList';
import SearchBar from './SearchBar';
import {hashHistory} from 'react-router';
import BookList from './BookList'
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';
import {reducer as notifReducer, actions as notifActions, Notifs} from 're-notif';
const {notifSend, notifClear} = notifActions;

export const Explore = class Explore extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if(!localStorage.token){
      hashHistory.push('/signIn');
    }
    this.props.getExploreBooks();
  }
  render(){
    return <div>
      <NavBarContainer/>
      <div className="innerDiv">
        <Notifs/>
        <h3>Welcome to Explore!</h3>

        <SearchBar/>
        <BookList books={this.props.books}/>

        <SearchBarContainer/>
        { /* if this has things ?  <BookList filteredBooks={this.props.filteredBooks}/>  :  <BookList books={this.props.books}/> */ }
      </div>
    </div>;
  }
}
function mapPropsToState(state){
  return {
    books: state.explore.get('books'), //gets the booklists
    filteredBooks: state.explore.get('filteredBooks')
  }
}

export const ExploreContainer = connect(
  mapPropsToState,
  actionCreators
)(Explore);