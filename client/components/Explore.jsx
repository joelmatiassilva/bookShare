import React from 'react';
import NavBar from './NavBar';
import ExploreBooksList from './ExploreBooksList';
import SearchBar from './SearchBar';
import {hashHistory} from 'react-router';

var books = [
  {
  isbn: 1234567,
  author: 'J.K. Rowling',
  title: 'Harry Potter: Philosopher\'s Stone',
  description: 'Wizards and spells',
  imageUrl: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
  genre: 'Novels'
  },
  {
  isbn: 1234567,
  author: 'J.K. Rowling',
  title: 'Harry Potter: Philosopher\'s Stone',
  description: 'Wizards and spells',
  imageUrl: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
  genre: 'Novels'
  },
  {
  isbn: 1234567,
  author: 'J.K. Rowling',
  title: 'Harry Potter: Philosopher\'s Stone',
  description: 'Wizards and spells',
  imageUrl: `http://vignette3.wikia.nocookie.net/harrypotter/images/8/86/Sorcerer's_stone_cover.jpg/revision/latest?cb=20060726180434`,
  genre: 'Novels'
  }
];


class Explore extends React.Component{
  componentWillMount(){
    if(!localStorage.token){
      hashHistory.push('/signIn');
    }
  }
  render(){
    return <div className="explore">
        <NavBar/>
        <h1>Welcome to Explore!</h1>
        <SearchBar/>
        <ExploreBooksList books={books}/>
    </div>
  }
}
export default Explore;