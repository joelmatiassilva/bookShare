import React from 'react';
import Fuse from 'fuse.js';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

class SearchBar extends React.Component{
  render(){
    return <div>
      <input type="text" placeholder="Search your friends' books" onChange={this.props.filterExploreFriendsBooks} />
    </div>;
  }
}

export default SearchBar;
// create a function that maps state to props
// follow what's the bottom of explore
// just need the actions

//use explorer reducer because its in explorer

function mapPropsToState(state){
  return {}
}

export const SearchBarContainer = connect(
  mapPropsToState,
  actionCreators
)(SearchBar);