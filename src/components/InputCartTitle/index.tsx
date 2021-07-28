import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styles from "./styles.module.scss";

const InputCartTitle = () => {
  return (
    <div className={styles.inputCartTitle}>
      <textarea name="" id="" cols={30} rows={3} contentEditable></textarea>
      <button>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export default InputCartTitle;
