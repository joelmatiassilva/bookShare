import React from 'react';
import * as actionCreators from '../action_creators';
import {connect} from 'react-redux';

export const FriendRequests = class FriendRequests extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.getFriendRequestsDoneToMe();
  }
  render(){
    return <div>
      <h1>FriendRequests done to me:</h1>
      { this.props.friendRequests ? this.props.friendRequests.map((friendRequest) => {
        return <p>{friendRequest.name} wants to be your friend</p>
      }) : null}
    </div>;
  }
}

function mapStateToProps(state){
  return {
    friendRequests: state.dashboard.get('friendRequests')
  }
}

export const FriendRequestsContainer = connect(
  mapStateToProps,
  actionCreators
)(FriendRequests);
