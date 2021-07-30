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

interface ListCard {
  handleCloseTextFied: () => void;
}

const ListCard = ({ handleCloseTextFied }: ListCard) => {
  const [cardName, setCardName] = useState("");
  const inputEl = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  function handleInput(e: any) {
    setCardName(e.target.value);
  }

  function handleOnKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey && cardName.length > 2) {
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
