import React from 'react';
import {Link} from 'react-router';

class NavBar extends React.Component{
  render(){
    return <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/explore">Explore</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>
  }
}

export default NavBar;