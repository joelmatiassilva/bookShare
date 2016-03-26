//react
import ReactDOM from 'react-dom';
import React from 'react';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

//redux
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './reducers/index.jsx';

//components
import {SignUpContainer} from './components/SignUp';
import {SignInContainer} from './components/SignIn';
import App from './components/App';
import {ExploreContainer} from './components/Explore';
import {DashboardContainer} from './components/Dashboard';
import {setState} from './action_creators';
import {Map} from 'immutable';

var store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  )
);

store.dispatch(setState(Map()));
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
      <Route path="/explore" component={ExploreContainer} />
      <Route path="/dashboard" component={DashboardContainer} />
    </Router>
  </Provider>
);

ReactDOM.render(<Main/>, document.getElementById('app'));
