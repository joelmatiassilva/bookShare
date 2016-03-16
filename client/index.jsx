//react
import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route} from 'react-router';

//redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';

//components
import SignUp from './components/SignUp.jsx';
import App from './components/App.jsx';

var Main = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} >
        <Route path="/SignUp" component={SignIn} />
        <Route path="/SignUp" component={SignUp} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(<Main/>, document.getElementById('app'));