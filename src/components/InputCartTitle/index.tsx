import React from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import styles from "./styles.module.scss";
import { useState } from "react";

const InputCartTitle = () => {
  const [title, setTitle] = useState(
    "Lorem Lore eadagt Lorem Lore eadagt easted sabumissLorem Lore eadagt easted sabumisseasted sabumiss "
  );

  function handleOnBlur() {
    console.log("saved");
  }
  return (
    <div className={styles.inputCartTitle}>
      <textarea
        cols={30}
        rows={3}
        onBlur={handleOnBlur}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      ></textarea>
      <button>
        <DeleteForeverIcon />
      </button>
    </div>
  );
};

export default InputCartTitle;
