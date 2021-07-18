import Input from "../Input";
import React from "react";
import styles from "./styles.module.scss";

const InputCard = () => {
  return (
    <div className={styles.group}>
      <Input label="Enter a name" type="text" name="ccvcvc" />
    </div>
  );
};

export default InputCard;
