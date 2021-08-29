import React, { SyntheticEvent, useState } from "react";
import styles from "./styles.module.scss";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import { useData } from "../../hooks/useData";

const InputSubTask = () => {
  const [value, setValue] = useState("");

  const { addSubtask, subtasks } = useData();

  const done = subtasks.reduce((acc, subtask) => {
    if (subtask.isDone === true) {
      acc++;
    }
    return acc;
  }, 0);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const subtask = value;
    setValue("");
    if (subtask.length > 0) {
      console.log("yess");
      await addSubtask(value);
    }
  };

  return (
    <div className={styles.inputSubTask}>
      <p>
        Subtasks ({done}/{subtasks.length})
      </p>
      <div className={styles.inputSubTask__wrapper}>
        <form onSubmit={handleSubmit}>
          <AddRoundedIcon fontSize="large" />
          <input
            type="text"
            placeholder='Type Here and Press "Enter"'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default InputSubTask;
