import React from 'react';
import ExploreBooksListEntry from './ExploreBooksListEntry';
import NavBar from './NavBar';

class ExploreBooksList extends React.Component{
  render(){
    return <div>
      <h1>These are your friend's books</h1>
      <div className="book-list">
      {this.props.books.map((book)=>{
        return <ExploreBooksListEntry {...book}/>
      })}
      </div>
    </div>;
  }
}

export default ExploreBooksList;