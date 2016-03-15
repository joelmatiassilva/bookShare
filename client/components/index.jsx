import App from './App.jsx';
var Router = window.ReactRouter.Router;
var Route = window.ReactRouter.Route;


var Main = () => (
  <Router>
    <Route path="/" component={App}/>
  </Router>
);

ReactDOM.render(<Main/>, document.getElementById('app'));