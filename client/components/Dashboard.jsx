import React from 'react';
import NavBar from './NavBar';
import {MyBooksContainer} from './MyBooks';
import MyFriends from './MyFriends';
import BooksLent from './BooksLent';
import BooksBorrowed from './BooksBorrowed';
import {hashHistory} from 'react-router';

var myBooks = [
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels'
  },
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels'
  },
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels'
  }
];
var myFriends = [
  {
    id: 2,
    username: 'Jonathan Blaising',
    email: 'j@blaze.com'
  },
  {
    id: 3,
    username: 'Leo BayBay',
    email: 'leo@baybay.com'
  },
  {
    id: 4,
    username: 'Hamzah Chaudhary',
    email: 'hamzah@Chaudhary'
  }
];
var booksLent = [
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels',
    borrower: 'Hamzah Chaudhary'
  },
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels',
    borrower: 'Hamzah Chaudhary'
  },
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels',
    borrower: 'Hamzah Chaudhary'
  }
];
var booksBorrowed = [
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels',
    owner: 'Jonathan Blaising'
  },
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels',
    owner: 'Jonathan Blaising'
  },
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels',
    owner: 'Jonathan Blaising'
  }
];

class Dashboard extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if(!localStorage.token){
      hashHistory.push('/signIn');
    }
  }
  render(){
    return <div>
        <NavBar/>
        <h1>Welcome to dashboard!</h1>
        <MyBooksContainer myBooks={myBooks}/>
        <MyFriends friends={myFriends}/>
        <BooksLent booksLent={booksLent}/>
        <BooksBorrowed booksBorrowed={booksBorrowed}/>
      </div>
  }
}
export default Dashboard;

