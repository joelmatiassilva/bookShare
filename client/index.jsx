import App from './components/App.jsx';
// var Router = window.ReactRouter.Router;
// var Route = window.ReactRouter.Route;
import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route} from 'react-router';

var Main = () => (
  <Router>
    <Route path="/" component={App}/>
  </Router>
);

ReactDOM.render(<Main/>, document.getElementById('app'));