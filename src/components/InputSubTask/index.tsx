import React from "react";
import styles from "./styles.module.scss";
import AddRoundedIcon from "@material-ui/icons/AddRounded";

const InputSubTask = () => {
  return (
    <div className={styles.inputSubTask}>
      <p>Subtasks (2/5)</p>
      <div className={styles.inputSubTask__wrapper}>
        <form>
          <AddRoundedIcon fontSize="large" />
          <input type="text" placeholder='Type Here and Press "Enter"' />
        </form>
      </div>
    </div>
  );
};

export default InputSubTask;
