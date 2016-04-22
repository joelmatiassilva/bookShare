import {Link} from 'react-router';
import React from 'react';

export const TabBar = class TabBar extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <ul className="tab-bar">
      <li className="sign-up tab">
        <Link className="button first" activeClassName="active" to="/signUp">Sign Up</Link>
      </li>
      <li className="sign-in tab">
        <Link className="button last" activeClassName="active" to="/signIn">Sign In</Link>
      </li>
    </ul>
  }
}