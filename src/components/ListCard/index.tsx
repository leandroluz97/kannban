import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import styles from "./styles.module.scss";
import { useData } from "../../hooks/useData";

interface ListCard {
  handleCloseTextFied: () => void;
  listId: string;
}

const ListCard = ({ handleCloseTextFied, listId }: ListCard) => {
  const [cardName, setCardName] = useState("");
  const inputEl = useRef<HTMLTextAreaElement | null>(null);

  const { addTask } = useData();

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  function handleInput(e: any) {
    setCardName(e.target.value);
  }

  async function handleOnKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey && cardName.length > 2) {
      await addTask(cardName, listId);
      handleCloseTextFied();
    }
  }

  function handleOnBlur() {
    handleCloseTextFied();
  }

  return (
    <div>
      <form className={styles.form}>
        <textarea
          ref={inputEl}
          value={cardName}
          onChange={handleInput}
          onKeyPress={handleOnKeyPress}
          rows={4}
          onBlur={handleOnBlur}
          placeholder="Type here..."
        />
      </form>
    </div>
  );
};

export default ListCard;
