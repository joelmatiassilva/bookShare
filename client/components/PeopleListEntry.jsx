import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const PeopleListEntry = class PeopleListEntry extends React.Component {
  render(){
    return <ul>
      Username: {this.props.name} Email: {this.props.email} 
      <button onClick={() => this.props.makeFriendRequest(this.props.email)}>Add friend</button>
    </ul>;
  }
}

function mapStateToProps(state){
  return {}
}

export const PeopleListEntryContainer = connect(
  mapStateToProps,
  actionCreators
)(PeopleListEntry);