import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header";

import List from "../../components/List";
import ListFrom from "../../components/ListForm";
import styles from "./styles.module.scss";

import { useParams } from "react-router-dom";
import { useData } from "../../hooks/useData";

interface ID {
  id: string;
}
const Dashboard = () => {
  // const [lists, setLists] = useState([1, 2, 3, 4, 5, 6, 7]);

  const { getLists, lists, getProject } = useData();

  let params: ID = useParams();

  useEffect(() => {
    async function getListsOnLoad() {
      await getLists(params.id);
      await getProject(params.id);
    }
    getListsOnLoad();
  }, [params]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <Header />
      </div>
      <div className={styles.dashboard__lists}>
        {lists.map((list) => (
          <List key={list.id} color={list.color} name={list.name} />
        ))}

        <ListFrom />
      </div>
    </div>
  );
};

export default Dashboard;
