import React from "react";

import List from "../../components/List";
import styles from "./styles.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <List />
    </div>
  );
};

export default Dashboard;
