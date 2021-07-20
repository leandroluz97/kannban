import React from "react";

import List from "../../components/List";
import ListFrom from "../../components/ListForm";
import styles from "./styles.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
      <ListFrom />
    </div>
  );
};

export default Dashboard;
