import React from 'react';
import {Link, hashHistory} from 'react-router';

class NavBar extends React.Component{
  logout(){
    //Fix logout
    localStorage.clear();
    hashHistory.push('/signIn');
  }
  checkIfLoggedIn(){
    return !!localStorage.getItem('token');
  }
  render(){
    return <nav>
      {this.checkIfLoggedIn() ? 
    <ul>
      <span>Bookshare</span>
      <li><Link to="/explore">Explore</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><a onClick={this.logout}>Logout</a></li>
    </ul> :
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
    </ul>
     }
    

  </nav>
  }
}

export default NavBar;