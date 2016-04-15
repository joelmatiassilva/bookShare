import React from 'react';
import * as actionCreators from '../actions/friendsActions';
import {connect} from 'react-redux';

export const PeopleListEntry = class PeopleListEntry extends React.Component {
  render(){
    return <li>
      <img src={this.props.imageUrl}/>
      <span className="userName">{this.props.name}</span>
      <button onClick={() => this.props.makeFriendRequest(this.props.email)}>Add friend</button>
    </li>;
  }
}

function mapStateToProps(state){
  return {}
}

export const PeopleListEntryContainer = connect(
  mapStateToProps,
  actionCreators
)(PeopleListEntry);