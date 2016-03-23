import React from 'react';
import PeopleListEntry from './PeopleListEntry';
class PeopleList extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
  return <div class-name="people-list">
    <h1>Found users with that query: </h1>
    <li>
    {this.props.peopleList ? 
      this.props.peopleList.map((person) => <PeopleListEntry {...person}/>) : 
      null}
    </li>
  </div>  
  }
}
export default PeopleList;