import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const MyFriends = class MyFriends extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.getMyFriends();
  }
  render(){
    return <div>
      Your friends:
      {this.props.friends ? this.props.friends.map((friend) => {
        return <li>
          ID: {friend.id}  EMAIL: {friend.email}
        </li>
      }) : null}

      <p>Search people and add them to your friends list:</p>
      <input type="text" placeholder="Type an email or username.."/>
    </div>
  }
}
function mapStateToProps(state){
  return {
    friends: state.dashboard.get('friends')
  }
}

export const MyFriendsContainer = connect(
  mapStateToProps,
  actionCreators
)(MyFriends);