import SignIn from './SignIn.jsx';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.children);
  }

  render() {
    return (
      <div className="hero">
        <h1>Bookshare</h1>
        <h3>Start sharing books with your friends!</h3>
        {this.props.children}
      </div>
    )
  }
}

export default App;