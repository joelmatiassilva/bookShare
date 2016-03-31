import React from 'react';
import {NavBarContainer} from './NavBar';
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
  send(){
    var notif = { message: 'hello, new notification', kind: 'success', dismissAfter: 1500};
    this.props.notifSend(notif);
  }
  clear(){
    this.props.notifClear();
  }
  render(){
    return <div>
      <NavBarContainer/>
      <div className="innerDiv">
        <Notifs/>
        <h3>Welcome to Explore!</h3>
        <SearchBar/>
        <BookList books={this.props.books}/>
        <button onClick={this.send.bind(this)}>Send</button>
      </div>
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