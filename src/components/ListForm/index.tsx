import { ChangeEvent, useState, FormEvent } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import styles from "./styles.module.scss";
import { useData } from "../../hooks/useData";

const ListFrom = () => {
  const [listName, setListName] = useState("");

  const { addList } = useData();

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setListName(e.target.value);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const inputName = listName;

    try {
      if (listName.length < 1) return;

      setListName("");
      await addList(inputName);
    } catch (error) {}
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
