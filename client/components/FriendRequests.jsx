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
    if(this.props.friendRequests){
      console.log('friendrequests in view');
      console.log(this.props.friendRequests);
    }
    return <div>
      <h1>FriendRequests done to me:</h1>
      { this.props.friendRequests ? this.props.friendRequests.map((friendRequest) => {
        return <p>{friendRequest.username} wants to be your friend
        <button onClick={(event) =>
          { console.log('Accepting request from: ' +
            friendRequest.username +
            'with FriendRequestID of ' +
            friendRequest.FriendRequestId);
            this.props.acceptFriendRequest(friendRequest.FriendRequestId);
        } }>Accept
          </button></p>;
      }) : null}
    </div>;
  }
}

function mapStateToProps(state){
  return {
    friendRequests: state.friends.get('friendRequests')
  }
}

export const FriendRequestsContainer = connect(
  mapStateToProps,
  actionCreators
)(FriendRequests);
