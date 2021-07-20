import { ChangeEvent, FormEvent, useState } from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import styles from "./styles.module.scss";

const ListCard = () => {
  const [cardName, setCardName] = useState("");

  function handleInput(e: ChangeEvent<HTMLTextAreaElement>) {
    setCardName(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (cardName.length < 1) return;
    console.log("yess");
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea value={cardName} onChange={handleInput} />
      </form>
    </div>
  );
};

export default ListCard;
