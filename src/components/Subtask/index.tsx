import React from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import styles from "./styles.module.scss";

const Subtask = () => {
  return (
    <div className={styles.subtask}>
      <form>
        <div className={styles.subtask__checkbox}>
          <label htmlFor="todo">
            <input type="checkbox" hidden id="todo" />
            <span></span>
          </label>
        </div>

        <div className={styles.subtask__todo}>
          <label>
            <input type="text " />
          </label>
        </div>

        <CloseRoundedIcon fontSize="large" />
      </form>
    </div>
  );
};

export default Subtask;
