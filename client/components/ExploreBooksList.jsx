import React from 'react';
import ExploreBooksListEntry from './ExploreBooksListEntry.jsx';
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