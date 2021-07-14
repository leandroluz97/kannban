import Login from "../components/Login";
import Signup from "../components/Signup";

import styles from "./styles.module.scss";
import { Switch, Route } from "react-router-dom";

const Routes = () => {
  return (
    <div>
      <Switch>
        <div className={styles.auth}>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </div>
      </Switch>
    </div>
  );
};

export default Routes;
