import React from 'react';
import NavBar from './NavBar';
import ExploreBooksList from './ExploreBooksList';
import SearchBar from './SearchBar';

var Explore = () => (
  <div className="explore">
      <NavBar/>
      <h1>Welcome to Explore!</h1>
      <SearchBar/>
      <ExploreBooksList/>
  </div>
);
export default Explore;