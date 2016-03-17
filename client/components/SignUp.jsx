import {Link} from 'react-router';
var SignUp = () => (
  <div className="signup">
    <h1>Sign Up Page</h1>
    User Name
    <input type='text' value="username"/>
    Email
    <input type='text' value="email"/>
    Password
    <input type='text' value='password'/>
    Retype Password
    <input type='text' value='retypePassword'/>
    <Link to="/signIn">Sign In</Link>
  </div>
);
export default SignUp;
