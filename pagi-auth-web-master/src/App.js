import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./containers/register";
import Verify from "./containers/verify";
import VerifStaff from "./containers/verifStaff";
import VerifParent from "./containers/verifParent";
import ResetPassword from "./containers/resetPassword";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/register" />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/verify/student">
          <Verify />
        </Route>
        <Route path="/verify/staff">
          <VerifStaff />
        </Route>
        <Route path="/verify/parent">
          <VerifParent />
        </Route>
        <Route path="/resetpassword/:role">
          <ResetPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
