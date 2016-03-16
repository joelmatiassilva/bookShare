//react
import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, hashHistory} from 'react-router';

//redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';

//components
import SignUp from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import App from './components/App.jsx';


var store = createStore(reducer);

var Main = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <Route path="/signIp" component={SignIn} />
        <Route path="/signUp" component={SignUp} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(<Main/>, document.getElementById('app'));