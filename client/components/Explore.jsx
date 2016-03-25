import React from 'react';
import {NavBarContainer} from './NavBar';
import ExploreBooksList from './ExploreBooksList';
import SearchBar from './SearchBar';
import {hashHistory} from 'react-router';
import BookList from './BookList'

var books = [
  {
    id: 1,
    isbn10: 1234567,
    isbn13: 213412341123,
    authors: '["Carol Dweck"]',
    title: 'Mindset',
    description: 'World-renowned Stanford University psychologist Carol Dweck, in decades of research on achievement and success, has discovered a truly groundbreaking idea—the power of our mindset',
    image: 'http://books.google.com/books/content?id=fdjqz0TPL2wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    categories: '["Psychology"]',
    ownerId: 3,
    ownerName: 'm6cheung'
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
        <NavBarContainer/>
        <h1>Welcome to Explore!</h1>
        <SearchBar/>
        <BookList books={books}/>
    </div>
  }
}
export default Explore;