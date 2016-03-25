import React from 'react';
import {PeopleListEntryContainer} from './PeopleListEntry';
class PeopleList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
  return <div class-name="people-list">
    <h1>Found users with that query: </h1>
    <li>
    {this.props.peopleList ? 
      this.props.peopleList.map((person) => <PeopleListEntryContainer {...person}/>) : 
      null}
    </li>
  </div>  
  }
}
export default PeopleList;