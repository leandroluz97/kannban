import React, { useEffect } from "react";
import { useData } from "../../hooks/useData";
import { useUI } from "../../hooks/useUi";
import styles from "./styles.module.scss";

interface TagType {
  name: string;
  color: string;
  id: string;
  isActive: boolean;
}

interface CartProps {
  title: string;
  id: string;
  tags: TagType[];
}

const Card = ({ title, id, tags }: CartProps) => {
  const { setTaskModalOpen } = useUI();
  const { getTask, getTags } = useData();

  const isActiveTags = tags.filter((tag) => tag.isActive === true);

  async function handleOpenTask() {
    setTaskModalOpen(true);
    await getTask(id);
  }

  return (
    <div className={styles.card} onClick={handleOpenTask}>
      <p>{title}</p>

      <div className={styles.card__tags}>
        {isActiveTags.map((tag) => (
          <p style={{ backgroundColor: tag.color }} key={tag.id}>
            {tag.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Card;
