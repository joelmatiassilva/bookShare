var SignIn = () => (
  <div className="signin">
    <h1>Sign In Page</h1>
    <form>
      <table>
        <tr><td>User Name or Email</td></tr>
        <tr><td> <input type="text" name="username" placeholder="Please enter your username"/></td></tr>
        <tr><td>Password</td></tr>
        <tr><td><input type="password" name="password" placeholder="Please enter your password"/></td></tr>
        <tr><td><input type="submit" value="Log in"/></td></tr>
        <tr><td><button onClick={this.props.facebookLogin}>Log in with facebook</button></td></tr>
      </table>
    </form>
  </div>
);


export default SignIn;
