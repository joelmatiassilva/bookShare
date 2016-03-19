import React from 'react';

class SearchBar extends React.Component{
  render(){
    return <div>
      <input type="text" placeholder="Type the name of a book you would like to borrow"/>
    </div>;
  }
}

export default SearchBar;