import React, { useEffect } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useData } from "../../hooks/useData";
import CircularProgress from "@material-ui/core/CircularProgress";

interface InputCardTitleProps {
  closeModal: () => void;
}
const InputCartTitle = ({ closeModal }: InputCardTitleProps) => {
  const { selectedTask, updateTask, deleteTask } = useData();

  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(selectedTask.name);
  }, [selectedTask]);

  async function handleOnBlur() {
    await updateTask({
      id: selectedTask.id,
      name: title,
      dueTime: selectedTask.dueTime,
      description: selectedTask.description || "",
      listId: selectedTask.listId,
      tags: selectedTask.tags,
    });
  }

  async function handleDeleteTask() {
    await deleteTask(selectedTask.id);
    closeModal();
  }
  return (
    <div className={styles.inputCartTitle}>
      {!title ? (
        <div className={styles.inputCartTitle__progress}>
          <CircularProgress size={20} />
        </div>
      ) : (
        <textarea
          cols={30}
          rows={3}
          onBlur={handleOnBlur}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        ></textarea>
      )}
      <button onClick={handleDeleteTask}>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export default InputCartTitle;
