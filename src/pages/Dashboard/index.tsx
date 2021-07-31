import React from "react";
import { useState } from "react";
import Header from "../../components/Header";

import List from "../../components/List";
import ListFrom from "../../components/ListForm";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const [lists, setLists] = useState([1, 2, 3, 4, 5, 6, 7]);
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <Header />
      </div>
      <div className={styles.dashboard__lists}>
        {lists.map((list) => (
          <List key={list} />
        ))}

        <ListFrom />
      </div>
    </div>
  );
};

export default Dashboard;
