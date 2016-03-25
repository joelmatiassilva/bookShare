import {Link} from 'react-router';
import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const SignUp = class SignUp extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <div className="signup">
    <h1>Sign Up Page</h1>
    <form>
      <fieldset>
        <p>
          User Name
          <input onChange={(event) => this.props.setUsername(event.target.value)} type='text' name="username" placeholder="Type a username"/>
          { this.props.usernameValidationMessage ?<label className="message error">Please enter a username</label> : null }
        </p>
        <p>
          Email
          <input onChange={(event) => this.props.setEmail(event.target.value)} type='text' name="email" placeholder="Type an email"/>
          { this.props.emailValidationMessage ?<label className="message error">Please enter an email</label> : null }
        </p>
        <p>
          Password
          <input onChange={(event)=>this.props.setPassword(event.target.value)} type='password' name='password' placeholder="Type your password"/>
          { this.props.passwordValidationMessage ?<label className="message error">Please enter a password</label> : null }
        </p>
        <p>
          Retype Password
          <input onChange={(event)=>this.props.setPasswordConfirmation(event.target.value)}type='password' name='retypePassword' placeholder="Retype your password"/>
          { this.props.passwordConfirmationValidationMessage ?<label className="message error">Please enter a password confirmation</label> : null }
        </p>
        <p>
          <input onClick={(event)=>{event.preventDefault();this.props.regularSignUp();}}type='submit' value="Sign Up"/>
        </p>
      </fieldset>
    </form>
    <Link to="/signIn">Go to Sign In</Link>
  </div>;
  }
}

function mapStateToProps(state){
  return {
    usernameValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'username']),
    emailValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'email']),
    passwordValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'password']),
    passwordConfirmationValidationMessage: state.auth.getIn(['displayValidationMessage', 'signUp', 'passwordConfirmation'])
  }
}

export const SignUpContainer = connect(
  mapStateToProps,
  actionCreators
)(SignUp);
