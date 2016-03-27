import React from 'react';

import {BookRequestListEntryContainer} from './BookRequestListEntry';

export const BookRequestsToUser = class BookRequestsToUser extends React.Component{
  render(){
    return <div className="book-requests">
      <h2>Books your friends want to borrow</h2>
      <ul className="requests-list">
      { 
        this.props.bookRequests ? 
        this.props.bookRequests.map((bookRequest) => {
          return <BookRequestListEntryContainer {...bookRequest}/>
      }) : null}
      </ul>
    </div>
  }
}