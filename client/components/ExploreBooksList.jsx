import React from 'react';
import ExploreBooksListEntry from './ExploreBooksListEntry';
import NavBar from './NavBar';
class ExploreBooksList extends React.Component{
  render(){
    return <div>
      <h1>Book List!</h1>
      <ExploreBooksListEntry/>
      <ExploreBooksListEntry/>
      <ExploreBooksListEntry/>
      <ExploreBooksListEntry/>
    </div>;
  }
}

export default ExploreBooksList;