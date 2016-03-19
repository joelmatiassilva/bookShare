import React from 'react';
class ExploreBooksListEntry extends React.Component{
  render(){
    return <div className="book-entry">
      <p class="title">{this.props.title}</p>
      <p>{this.props.author}</p>
      <p>{this.props.description}</p>
      <img src={this.props.imageUrl}/>
      <p>{this.props.genre}</p>
    </div>;
  }
}

export default ExploreBooksListEntry;