import React, { KeyboardEvent, SyntheticEvent, useRef, useState } from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import styles from "./styles.module.scss";
import { Checkbox, withStyles } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../../hooks/useData";

const CustomCheckbox = withStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },

    padding: 0,
    color: "#13c552",
    "&$checked": {
      color: "#13c552",
    },
    icon: {
      width: 50,
      height: 50,
    },
  },

  checked: {},
});

interface SubtaskProp {
  subtask: string;
  isDone: boolean;
  id: string;
}

const Subtask = ({ subtask, id, isDone }: SubtaskProp) => {
  const [state, setstate] = useState(subtask);
  const [isChecked, setIsChecked] = useState(isDone);

  const { deleteSubtask, updateSubtask } = useData();

  const CheckBox = CustomCheckbox((props) => {
    return (
      <Checkbox
        color="default"
        {...props}
        disableRipple
        size="medium"
        checked={isChecked}
        onChange={handleCheckbox}
      />
    );
  });

  const subtaskRef = useRef<HTMLParagraphElement | null>(null);

  async function handleOnBlur() {
    //setstate(subtaskRef.current?.innerText ? subtaskRef.current?.innerText : "");
    subtaskRef.current?.blur();

    await updateSubtask(id, isChecked, state);
  }

  function handleOnKeyPress(event: KeyboardEvent<HTMLParagraphElement>) {
    setstate(subtaskRef.current?.innerText as string);
    console.log(subtaskRef.current?.innerText);

    if (event.key === "Enter") {
      subtaskRef.current?.blur();
    }
    console.log(state);
  }

  const handleDelete = async () => {
    await deleteSubtask(id);
  };

  async function handleCheckbox() {
    setIsChecked(!isChecked);
    //await updateSubtask(id, isChecked, state);
  }

  return (
    <div className={styles.subtask}>
      <div className={styles.subtask__form}>
        <CheckBox key={id} />

        <div className={styles.subtask__todo}>
          {/*<input type="text " />*/}
          <p
            contentEditable={true}
            onBlur={handleOnBlur}
            ref={subtaskRef}
            onKeyDown={handleOnKeyPress}
            suppressContentEditableWarning={true}
            onChange={(e) => setstate("")}
          >
            {state}
          </p>
        </div>
        <button onClick={handleDelete}>
          <CloseRoundedIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Subtask;
