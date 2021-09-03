import Login from "../components/Login";
import Signup from "../components/Signup";
import Reset from "../components/Reset";
import Dashboard from "../pages/Dashboard";
import GettingStarted from "../pages/GettingStarted";
import Settings from "../pages/Settings";

import styles from "./styles.module.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useAuth } from "../hooks/useAuth";

const Routes = () => {
  const { currentUser } = useAuth();

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
            <Route path="/project/:id" component={Dashboard} />
            <Route path="/gettingstarted" component={GettingStarted} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </div>
    );
  }

  return <>{routes}</>;
};

export default Routes;
