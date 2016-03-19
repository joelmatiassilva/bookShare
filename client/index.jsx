//react
import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

//redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';

//components
import {SignUpContainer} from './components/SignUp';
import {SignInContainer} from './components/SignIn';
import App from './components/App';
import Explore from './components/Explore';
import Dashboard from './components/Dashboard';

var store = createStore(reducer);

//TODO DELETE: delete this subscribe when deploying
store.subscribe(() => {
  console.log(store.getState());
});

var Main = () => (
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={SignInContainer}/>
        <Route path="/signIn" component={SignInContainer} />
        <Route path="/signUp" component={SignUpContainer} />
      </Route>
      <Route path="/explore" component={Explore} />
      <Route path="/dashboard" component={Dashboard} />
    </Router>
  </Provider>
);

ReactDOM.render(<Main/>, document.getElementById('app'));
