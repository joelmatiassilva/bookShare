//react
import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

//redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducer';

//components
import {SignUpContainer} from './components/SignUp.jsx';
import {SignInContainer} from './components/SignIn.jsx';
import App from './components/App.jsx';
import Explore from './components/Explore.jsx';

var store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

// var createElement = function(Component, props){
//   return <Component {...props} />
// }

var Main = () => (
  <Provider store={store}>
    <Router history={hashHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={SignInContainer}/>
        <Route path="/signIn" component={SignInContainer} />
        <Route path="/signUp" component={SignUpContainer} />
      </Route>
      <Route path="/explore" component={Explore} />
    </Router>
  </Provider>
);

ReactDOM.render(<Main/>, document.getElementById('app'));