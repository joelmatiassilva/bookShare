import React from 'react';
import {NavBarContainer} from './NavBar';
import {MyBooksContainer} from './MyBooks';
import BooksLent from './BooksLent';
import BooksBorrowed from './BooksBorrowed';
import {BookRequestsToUser} from './BookRequestsToUser';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

var booksLent = [
  {
    isbn: 1234567,
    author: 'J.K. Rowling',
    title: 'Harry Potter: Philosopher\'s Stone',
    description: 'Wizards and spells',
    image: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
    genre: 'Novels',
    borrower: 'Stephan B.'
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
    borrower: 'Michael C.'
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
    owner: 'Yasu F.'
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
    owner: 'Yasu F.'
  }
];

var bookRequests = [
  {
    id: 1
  },{
    id: 2
  },{
    id: 3
  }
];

export const MyLibrary = class MyLibrary extends React.Component{
  constructor(props){
    super(props);
  }
  componentWillMount(){
    if(!localStorage.token){
      hashHistory.push('/signIn');
    }
    this.props.getBookRequestsToUser();
    console.log('Mounting MyLibrary');
  }
  componentWillUpdate(){
    console.log('Updating MyLibrary');
  }
  render(){
    return <div>
        <NavBarContainer/>
        <MyBooksContainer/>
        <BooksLent booksLent={booksLent}/>
        <BooksBorrowed booksBorrowed={booksBorrowed}/>
        <BookRequestsToUser bookRequests={this.props.bookRequestsToUser}/>
      </div>
  }
}

function mapStateToProps(state){
  return {
    bookRequestsToUser: state.myLibrary.getIn(['bookRequests', 'toUser'])
  }
}

export const MyLibraryContainer = connect(
  mapStateToProps,
  actionCreators
)(MyLibrary);



