import Login from "../components/Login";
import Signup from "../components/Signup";
import Reset from "../components/Reset";
import Dashboard from "../pages/Dashboard";
import GettingStarted from "../pages/GettingStarted";
import Settings from "../pages/Settings";

import styles from "./styles.module.scss";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useAuth } from "../hooks/useAuth";
import Archive from "../pages/Archive";
import ExpandButton from "../components/ExpandButton";
import SideBarMobile from "../components/SidebarMobile";
import LoadingState from "../components/LoadingState";
import { useEffect } from "react";
import { useData } from "../hooks/useData";
import NotificationPage from "../pages/Notification";

const Routes = () => {
  const { currentUser } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission();
    }
  }, []);

  let routes = (
    <>
      <div className={styles.auth}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/resetPassword" component={Reset} />
          <Redirect to="/login" />
        </Switch>
      </div>
    </>
  );

  if (currentUser) {
    routes = (
      <>
        <div className={styles.app}>
          <div>
            <SideBar />
          </div>
          <div className={pathname.includes("gettingstarted") ? `${styles.routes} ${styles.routes__m0}` : `${styles.routes}`}>
            <ExpandButton />
            <SideBarMobile />
            <Switch>
              <Route path="/gettingstarted" component={GettingStarted} />
              <Route path="/project/:id" component={Dashboard} />
              <Route path="/settings" component={Settings} />
              <Route path="/notification" component={NotificationPage} />
              <Route path="/archive" component={Archive} />
              <Redirect to="/gettingstarted" />
            </Switch>
          </div>
        </div>
      </>
    );
  }

  return <>{routes}</>;
};

export default Routes;
