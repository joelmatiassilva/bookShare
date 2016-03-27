import {Link} from 'react-router';
import React from 'react';
// import {connect} from 'react-redux';
// import * as actionCreators from '../action_creators';

export const TabBar = class TabBar extends React.Component{
  constructor(props){
    super(props);
  }
  // contains tab bars that link to signIn and SignUp pages
  render(){
    return <div className="tabBar">
      <div className="signUp tab">
        <Link to="/signUp">Sign Up</Link>
      </div>

      <div className="signIn tab">
        <Link to="/signIn">Sign In</Link>
      </div>
    </div>
  }
}

// function mapStateToProps(state){
//   return {
//     usernameValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'username']),
//     emailValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'email']),
//     passwordValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'password']),
//     passwordConfirmationValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'passwordConfirmation'])
//   }
// }

// export const TabBarContainer = connect(
//   mapStateToProps,
//   actionCreators
// )(TabBar);
