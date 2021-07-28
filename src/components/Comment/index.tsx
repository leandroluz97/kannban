import React from "react";
import styles from "./styles.module.scss";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

const Comment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        <span className={styles.comment__date}>Jul 27, 2021 9:30pm</span>
        <button>
          <CloseRoundedIcon fontSize="large" />
        </button>
      </div>

      <div className={styles.comment__body}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, sed.
        </p>
      </div>
    </div>
  );
};

export default Comment;
