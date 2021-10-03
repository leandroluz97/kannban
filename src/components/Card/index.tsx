import React, { useEffect } from "react";
import { useData } from "../../hooks/useData";
import { useUI } from "../../hooks/useUi";
import styles from "./styles.module.scss";
import { Draggable } from "react-beautiful-dnd";

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
  position: number;
}

const Card = ({ title, id, tags, position }: CartProps) => {
  const { setTaskModalOpen } = useUI();
  const { getTask, getTags } = useData();

  const isActiveTags = tags.filter(
    (tag) => tag.isActive === true
  );

  async function handleOpenTask() {
    setTaskModalOpen(true);
    await getTask(id);
  }

  return (
    <Draggable draggableId={id.toString()} index={position}>
      {(provided) => (
        <div
          className={styles.card}
          onClick={handleOpenTask}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{title}</p>

          <div className={styles.card__tags}>
            {isActiveTags.map((tag) => (
              <p
                style={{ backgroundColor: tag.color }}
                key={tag.id}
              >
                {tag.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
