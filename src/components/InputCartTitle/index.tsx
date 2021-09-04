import React, { useEffect } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useData } from "../../hooks/useData";
import CircularProgress from "@material-ui/core/CircularProgress";

interface InputCatdTitleProps {
  titleCard: string;
}
const InputCartTitle = () => {
  const { selectedTask, updateTask } = useData();

  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(selectedTask.name);
  }, [selectedTask]);

  console.log(selectedTask);

  async function handleOnBlur() {
    console.log("saved");

    await updateTask({
      id: selectedTask.id,
      name: title,
      dueTime: selectedTask.dueTime,
      description: selectedTask.description || "",
      listId: selectedTask.listId,
    });
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
      <button>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export default InputCartTitle;
