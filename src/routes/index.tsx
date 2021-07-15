import Login from "../components/Login";
import Signup from "../components/Signup";
import Reset from "../components/Reset";
import Dashboard from "../pages/Dashboard";

import styles from "./styles.module.scss";
import { Switch, Route, Redirect } from "react-router-dom";

const Routes = () => {
  return (
    <div>
      <Switch>
        <div className={styles.auth}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/resetPassword" component={Reset} />
          <Route path="/dashboard" component={Dashboard} />
          <Redirect to="/signup" />
        </div>
      </Switch>
    </div>
  );
};

export default Routes;
