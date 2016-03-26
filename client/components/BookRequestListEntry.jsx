import React from 'react';

export const BookRequestListEntry = class BookRequestListEntry extends React.Component{
  render(){
    return <li>
      <p>MICHAEL wants to borrow:</p>
      <p>{this.props.title}</p>
      BookRequestId: {this.props.BookRequestId}
      <button>Accept</button>
      <img src={this.props.image}/>
    </li>
  }
}