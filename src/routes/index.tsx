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
import Archive from "../pages/Archive";
import ExpandButton from "../components/ExpandButton";
import SideBarMobile from "../components/SidebarMobile";

const Routes = () => {
  const { currentUser } = useAuth();

  let routes = (
    <>
      <Switch>
        <div className={styles.auth}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/resetPassword" component={Reset} />
          <Redirect to="/login" />
        </div>
      </Switch>
    </>
  );

  if (currentUser) {
    routes = (
      <>
        <div className={styles.app}>
          <div>
            <SideBar />
          </div>
          <div className={styles.routes}>
            <ExpandButton />
            <SideBarMobile />
            <Switch>
              <Route path="/gettingstarted" component={GettingStarted} />
              <Route path="/project/:id" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Route path="/archive" component={Archive} />
            </Switch>
          </div>
        </div>
      </>

    );
  }

  return <>{routes}</>;
};

export default Routes;
