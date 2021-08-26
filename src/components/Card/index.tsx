import React from "react";
import { useData } from "../../hooks/useData";
import { useUI } from "../../hooks/useUi";
import styles from "./styles.module.scss";

interface CartProps {
  title: string;
  id: string;
}

const Card = ({ title, id }: CartProps) => {
  const { setTaskModalOpen } = useUI();
  const { getTask } = useData();

  async function handleOpenTask() {
    setTaskModalOpen(true);
    await getTask(id);
  }

  return (
    <div className={styles.card} onClick={handleOpenTask}>
      <p>{title}</p>

      <div className={styles.card__tags}>
        <p>cool</p>
        <p>awsome</p>
        <p>finished</p>
      </div>
    </div>
  );
};

export default Card;
