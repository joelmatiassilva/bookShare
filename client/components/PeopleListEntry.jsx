import React from 'react';

class PeopleListEntry extends React.Component{
  render(){
    return <ul>
      Username: {this.props.name} Email: {this.props.email}
    </ul>;
  }
}
export default PeopleListEntry;