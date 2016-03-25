import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import DebounceInput from 'react-debounce-input';
import PeopleList from './PeopleList';
import {FriendRequestsContainer} from './FriendRequests';

import Preloader from './Preloader';

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
      <DebounceInput debounceTimeout={200} type="text" placeholder="Type an email or username.." onChange={(event) => this.props.searchUsers(event.target.value)}/>
      { this.props.loading ? <Preloader/> : null}
      <PeopleList peopleList={this.props.foundUsers}/>
      <FriendRequestsContainer/>
    </div>
  }
}
function mapStateToProps(state){
  return {
    friends: state.dashboard.get('friends'),
    foundUsers: state.dashboard.get('foundUsers'),
    loading: state.dashboard.getIn(['loading', 'foundUsers'])
  }
}

export const MyFriendsContainer = connect(
  mapStateToProps,
  actionCreators
)(MyFriends);