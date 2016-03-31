import React from 'react';
import Fuse from 'fuse.js';
import * as actionCreators from '../action_creators';

class SearchBar extends React.Component{
  render(){
    return <div>
      <input type="text" placeholder="Search your friends' books"/>

    </div>;
  }
}

export default SearchBar;