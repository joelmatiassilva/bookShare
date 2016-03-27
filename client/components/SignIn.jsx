import React from 'react';
import {Link} from 'react-router'
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';
import NavBar from './NavBar';
import Preloader from './Preloader';
import {TabBar} from './TabBar';

export const SignIn = class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  changeUsername(username){
    this.setState({
      username: username
    })
    this.props.setEmail(username);
  }
  changePassword(password){
    this.setState({
      password: password
    });
    this.props.setPassword(password);
  }
  render() {
    return <div className="signin">
    <h3>Sign In Page</h3>
    <TabBar></TabBar>
    <form>
      <table>
        <tr><td>User Name or Email</td></tr>
        <tr><td>
          <input onChange={(event) => this.changeUsername(event.target.value)} type="text" name="username" placeholder="Please enter your username"/>
          { this.props.usernameValidationMessage ? <label className="message error">Please enter a username</label> : null }
        </td></tr>
        <tr>
          <td>Password</td>
        </tr>
        <tr>
          <td>
            <input onChange={(event)=>this.changePassword(event.target.value)} type="password" placeholder="Please enter your password"/>
            { this.props.passwordValidationMessage ? <label className="message error">Please enter a password</label> : null }
          </td>
        </tr>
        <tr>
          <td>
            <input onClick={(event) =>{event.preventDefault();this.props.regularSignIn(this.state.username, this.state.password)} }type="submit" value="Log in"/>
          </td>
        </tr>
        <tr><td><a href="login/facebook">Login with facebook</a></td></tr>
      </table>
    </form>
  </div>;
  }
}
function mapStateToProps(state){
  return {
    usernameValidationMessage: state.auth.getIn(['displayValidationMessage', 'signIn', 'username']),
    passwordValidationMessage: state.auth.getIn(['displayValidationMessage', 'signIn', 'password'])
  }
}

export const SignInContainer = connect(
  mapStateToProps,
  actionCreators
)(SignIn);

export default SignIn;
