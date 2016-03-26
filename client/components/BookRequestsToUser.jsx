import React from 'react';

import {BookRequestListEntry} from './BookRequestListEntry';

export const BookRequestsToUser = class BookRequestsToUser extends React.Component{
  render(){
    return <div>
      <h2>Books your friends want to borrow</h2>
      <ul class="request-list">
      { 
        this.props.bookRequests ? 
        this.props.bookRequests.map((bookRequest) => {
          return <BookRequestListEntry {...bookRequest}/>
      }) : null}
      </ul>
    </div>
  }
}