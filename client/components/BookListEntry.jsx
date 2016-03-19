import React from 'react';
class BooksListEntry extends React.Component{
  render(){
    return <div className="book-entry">
      <p class="title">{this.props.title}</p>
      <p>{this.props.author}</p>
      <p>{this.props.description}</p>
      <img src={this.props.imageUrl}/>
      <p>{this.props.genre}</p>
      {this.props.borrower ? 
        <p>Lent to: {this.props.borrower}</p> : null}
      {this.props.owner ? 
      <p>Borrowed from: {this.props.owner}</p> : null}
    </div>;
  }
}

export default BooksListEntry;