import React from 'react';
import ReactTooltip from 'react-tooltip';
import {connect} from 'react-redux';
import * as actionCreators from '../action_creators';

export const BookListEntry = class BooksListEntry extends React.Component{
  formatDescription(){
    var description = this.props.description;
    if(description && description.length > 400){
      return description.slice(0, 400) + ' ...more';
    }
    return description;
  }
  render(){
    if(!this.props.hasOwnProperty('title')) return null;
    // var x = <div>
    //   <p class='title'>{this.props.title}</p>
    //   <p>{this.props.author}</p>
    //   <p>{this.formatDescription()}</p>
    // </div>

    return <div className="book-entry">
      <img src={this.props.image} data-tip={
        "<div>" +
          "<p class='title'>" + this.props.title + "</p>" +
          // "<p>" + this.props.author + "</p>" +
          "<p>" + this.formatDescription() + "</p>" +
        "</div>"
      } data-html="true" />
      <p>{this.props.genre}</p>
      {this.props.borrower ?
        <p>Lent to: {this.props.borrower}</p> : null}
      {this.props.owner ?
      <p>Borrowed from: {this.props.owner}</p> : null}
      {this.props.searchedBook ?
        <button onClick={() => {this.props.addBookToMyShelf(this.props); }}>Add to my Library</button>
        : null}
      { this.props.userId ? <div>
          <p>Owner: {this.props.username}</p>
          <button onClick={() => this.props.borrowBook({bookId: this.props.id, ownerId: this.props.userId})}>Borrow book</button>
        </div> : null }
      <ReactTooltip />
    </div>;
  }
}
function mapStateToProps(){
  return {};
}

export const BookListEntryContainer = connect(
  mapStateToProps,
  actionCreators
)(BookListEntry);