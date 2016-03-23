import React from 'react';

class Preloader extends React.Component{
  render(){
    return <div>
      <img className="preloader" src="assets/preloader.gif"/>
    </div>;
  }
}

export default Preloader;