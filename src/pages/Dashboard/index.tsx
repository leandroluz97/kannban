import React from "react";
import { useState } from "react";

import List from "../../components/List";
import ListFrom from "../../components/ListForm";
import styles from "./styles.module.scss";

const Dashboard = () => {
  const [lists, setLists] = useState([1, 2, 3, 4, 5, 6, 7]);
  return (
    <div className={styles.dashboard}>
      {lists.map((list) => (
        <List key={list} />
      ))}

      <ListFrom />
    </div>
  );
};

export default Dashboard;
