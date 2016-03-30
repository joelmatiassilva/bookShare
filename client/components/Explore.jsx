import React from 'react';
import {NavBarContainer} from './NavBar';
import ExploreBooksList from './ExploreBooksList';
import SearchBar from './SearchBar';
import {hashHistory} from 'react-router';
import BookList from './BookList'
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';
import NotificationSystem from 'react-notification-system';

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
  _addNotification(event){
    event.preventDefault();
    console.log('notificationSystem');
    console.log(this.refs.notificationSystem);
    this.refs.notificationSystem.addNotification({
      message: 'Notification message',
      level: 'success'
    });
  }

  componentDidMount(){
    this._notificationSystem = this.refs.notificationSystem;
    console.log('NOTIFICATION SYSTEM');
    console.log(this._notificationSystem);
    console.log(this.refs.notificationSystem);
  }
  render(){
    return <div>
      <NavBarContainer/>
      <div className="innerDiv">
        <h3>Welcome to Explore!</h3>
        <SearchBar/>
        <BookList books={this.props.books}/>
        <button onClick={this._addNotification}>Add notification</button>
        <NotificationSystem ref="notificationSystem"/>
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