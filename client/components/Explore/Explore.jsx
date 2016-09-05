import React from 'react';
import { NavBarContainer } from './../NavBar';
import {SearchBarContainer} from './../SearchBar';
import ExploreBooksList from './../ExploreBooksList';
import SearchBar from './../SearchBar';
import {hashHistory} from 'react-router';
import BookList from './../BookList'
import * as actionCreators from '../../actions/exploreActions';
import { connect } from 'react-redux';
import { reducer as notifReducer, actions as notifActions, Notifs } from 're-notif';
const { notifSend, notifClear } = notifActions;

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

        <SearchBarContainer/>
        { this.props.filteredBooks && this.props.filteredBooks.map( (book) => {
          <div>{book.title}</div>
        }) }
         <BookList books={(this.props.filter && this.props.filter.length > 0) ? this.props.filteredBooks : this.props.books} />
        {/* !this.props.filteredBooks ?<h1>You don't have any friends yet, go add some!</h1> : null */}
        {/*<h1>You don't have any friends yet, go add some!</h1>*/}
      </div>
    </div>;
  }
}
function mapPropsToState(state){
  return {
    books: state.explore.get('books'),
    filteredBooks: state.explore.get('filteredBooks'),
    filter: state.explore.get('filter')
  }
}

export const ExploreContainer = connect(
  mapPropsToState,
  actionCreators
)(Explore);