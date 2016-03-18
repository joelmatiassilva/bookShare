import React from 'react';
import NavBar from './NavBar';
import MyBooks from './MyBooks';
import MyFriends from './MyFriends';
import BooksLent from './BooksLent';
import BooksBorrowed from './BooksBorrowed';

class Dashboard extends React.Component{
  render(){
    return <div>
        <NavBar/>
        <h1>Welcome to dashboard!</h1>
        <MyBooks/>
        <MyFriends/>
        <BooksLent/>
        <BooksBorrowed/>
      </div>
  }
}

export default Dashboard;