import ReactDOM from 'react-dom';

class App extends React.Component{
  render(){
    return 
      <div>
        <h1>Bookshare</h1>
        <h3>Start sharing books with your friends!</h3>
      </div>
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
// export default App;