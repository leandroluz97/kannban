import Login from "../components/Login";
import Signup from "../components/Signup";
import Reset from "../components/Reset";
import Dashboard from "../pages/Dashboard";

import styles from "./styles.module.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import SideBar from "../components/SideBar";

const Routes = () => {
  const currentUser = true;
  let routes = (
    <Switch>
      <div className={styles.auth}>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/resetPassword" component={Reset} />
        <Redirect to="/signup" />
      </div>
    </Switch>
  );

  if (currentUser) {
    routes = (
      <div className={styles.app}>
        <div>
          <SideBar />
        </div>
        <div className={styles.routes}>
          <Switch>
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </div>
    );
  }

  return <>{routes}</>;
};

export default Routes;
