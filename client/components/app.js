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
      <div>

      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);