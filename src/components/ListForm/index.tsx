import { ChangeEvent, useState, FormEvent } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import styles from "./styles.module.scss";

const ListFrom = () => {
  const [listName, setListName] = useState("");

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setListName(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (listName.length < 1) return;
    console.log("yess");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <AddRoundedIcon fontSize="large" />
        <input
          type="text"
          placeholder="Add List"
          value={listName}
          onChange={handleInput}
        />
      </form>
    </div>
  );
};

export default ListFrom;
