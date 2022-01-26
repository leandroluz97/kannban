import React, { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "../../components/Header";

import List from "../../components/List";
import ListFrom from "../../components/ListForm";
import styles from "./styles.module.scss";

import { useParams, useHistory } from "react-router-dom";
import { useData } from "../../hooks/useData";
import { SortByPosition } from "../../utils/sortByPosition";

interface ID {
  id: string;
}
const Dashboard = () => {
  // const [lists, setLists] = useState([1, 2, 3, 4, 5, 6, 7]);

  const { getLists, lists, getProject, selectedProject, getTasks, switchList } = useData();

  let params: ID = useParams();

  useEffect(() => {
    async function getListsOnLoad() {
      await getLists(params.id);
      await getProject(params.id);
      await getTasks();
    }
    getListsOnLoad();
  }, [params]);

  const onDragEnd = (result: any) => {
    if (result.destination === null) return;

    console.log(result);

    switchList(result.source.index, result.destination.index);
  };

  console.log(lists);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <Header />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="LISTTASK" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} className={styles.dashboard__lists} {...provided.droppableProps}>
              {lists.sort(SortByPosition).map((list) => (
                <List key={list.id} color={list.color} name={list.name} id={list.id} position={list.position} />
              ))}
              {provided.placeholder}
              <ListFrom />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
