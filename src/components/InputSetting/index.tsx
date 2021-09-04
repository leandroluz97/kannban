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

interface InputProps {
  label: string;
}

const InputSettings = ({ label }: InputProps) => {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef<HTMLParagraphElement | null>(null);

  async function handleOnBlur(event: any) {
    const text = event.target.innerText;

    inputRef.current?.blur();
  }

  const handleDelete = async () => {};

  async function handleOnKeyPress(event: KeyboardEvent<HTMLParagraphElement>) {
    if (event.key === "Enter") {
      inputRef.current?.blur();
    }
  }

  return (
    <>
      <div className={styles.label}>
        <p aria-label="label">{label}</p>
      </div>
      <div className={styles.input}>
        <div className={styles.input__form}>
          <div className={styles.input__todo}>
            <ContentEditable
              innerRef={inputRef}
              html={"Leandro Soares"}
              disabled={false}
              onChange={(event) => setInputValue(event.target.value as string)}
              onKeyDown={handleOnKeyPress}
              onBlur={handleOnBlur}
              tagName="p"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InputSettings;