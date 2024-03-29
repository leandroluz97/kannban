import React, { useEffect, useMemo } from "react";
import { useData } from "../../hooks/useData";
import { useUI } from "../../hooks/useUi";
import styles from "./styles.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";

interface TagType {
  name: string;
  color: string;
  id: string;
  isActive: boolean;
}
interface CommentType {
  comment: string;
  id: string;
  createdAt: string;
}

interface SubTaskType {
  subtask: string;
  id: string;
  createdAt: string;
  isDone: boolean;
}

interface CartProps {
  title: string;
  id: string;
  tags: TagType[];
  comments: CommentType[];
  subtasks: SubTaskType[];
  position: number;
  dueTime?: Date;
}

const Card = ({ title, id, tags, position, comments, subtasks, dueTime }: CartProps) => {
  const { setTaskModalOpen } = useUI();
  const { getTask, getTags, subtasks: allSubtasks } = useData();

  const subtasksStats = useMemo(
    () =>
      subtasks.reduce(
        (acc, s) => {
          if (s.isDone) {
            acc.done++;
          } else {
            acc.todo++;
          }
          return acc;
        },
        { done: 0, todo: 0 }
      ),
    [allSubtasks]
  );

  const isActiveTags = tags.filter((tag) => tag.isActive === true);

  async function handleOpenTask() {
    setTaskModalOpen(true);
    await getTask(id);
  }

  return (
    <Draggable draggableId={id.toString()} index={position}>
      {(provided) => (
        <div className={styles.card} onClick={handleOpenTask} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {dueTime && dueTime < new Date() ? <div className={styles.card__dueDate}>{format(new Date(dueTime), "MMM d")}</div> : ""}
          <p>{title}</p>

          <div className={styles.card__tags}>
            {isActiveTags.map((tag) => (
              <p style={{ backgroundColor: tag.color }} key={tag.id}>
                {tag.name}
              </p>
            ))}
          </div>
          <div className={styles.card__stats}>
            <p>
              ✔️{subtasks.length}/{subtasksStats.done}
            </p>
            <p>💬{comments.length}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
