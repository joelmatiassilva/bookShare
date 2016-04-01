import React from 'react';
import Fuse from 'fuse.js';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

class SearchBar extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <div>
      <input type="text" placeholder="Search your friends' books" onChange={(event) => this.props.filterExploreFriendsBooks(event.target.value)} />
    </div>;
  }
}

function mapPropsToState(state){
  return {}
}

export const SearchBarContainer = connect(
  mapPropsToState,
  actionCreators
)(SearchBar);
