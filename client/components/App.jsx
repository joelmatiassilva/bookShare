import SignIn from './SignIn.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("app did mount");
  }

  render() {
    return (
      <div className="hero">
        <h1>Bookshare</h1>
        <h3>Start sharing books with your friends!</h3>
        <SignIn/>
      </div>
    )
  }
}

export default App;