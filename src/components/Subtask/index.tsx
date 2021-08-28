import React, { KeyboardEvent, SyntheticEvent, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import styles from "./styles.module.scss";
import { Checkbox, withStyles } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../../hooks/useData";
import { useEffect } from "react";
import { ChangeEvent } from "react";

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
  const [subtaskName, setsubtaskName] = useState(subtask);
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

  async function handleOnBlur(event: any) {
    const text = event.target.innerText;

    await updateSubtask(id, isChecked, text);
    subtaskRef.current?.blur();
  }

  const handleDelete = async () => {
    await deleteSubtask(id);
  };

  async function handleCheckbox() {
    setIsChecked(!isChecked);
    await updateSubtask(id, !isChecked, subtaskName);
  }

  async function handleOnKeyPress(event: KeyboardEvent<HTMLParagraphElement>) {
    if (event.key === "Enter") {
      subtaskRef.current?.blur();
    }
  }

  return (
    <div className={styles.subtask}>
      <div className={styles.subtask__form}>
        <CheckBox key={id} />

        <div className={styles.subtask__todo}>
          <ContentEditable
            innerRef={subtaskRef}
            html={subtaskName}
            disabled={false}
            onChange={(event) => setsubtaskName(event.target.value as string)}
            onKeyDown={handleOnKeyPress}
            onBlur={handleOnBlur}
            tagName="p"
          />
        </div>
        <button onClick={handleDelete}>
          <CloseRoundedIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Subtask;
