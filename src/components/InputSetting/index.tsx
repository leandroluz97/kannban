import React, { KeyboardEvent, SyntheticEvent, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import styles from "./styles.module.scss";
import { Checkbox, withStyles } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { useData } from "../../hooks/useData";
import { useEffect } from "react";
import { ChangeEvent } from "react";
import { useAuth } from "../../hooks/useAuth";

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
  value?: string;
  isEditable?: boolean;
  name: string;
}

interface UserProps {
  displayName: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

const InputSettings = ({
  label,
  value,
  isEditable = false,
  name,
}: InputProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    //setInputValue(value as string)
  }, [])

  const { updateSettings, currentUser, currentUserOnSettings } = useAuth();

  const inputRef = useRef<HTMLParagraphElement | null>(null);

  async function handleOnBlur(event: any) {
    const text = event.target.innerText;


    let field = {
      [event.target.id]: text,
    };

    await updateSettings(field);
    inputRef.current?.blur();
  }

  const handleDelete = async () => { };

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
              html={inputValue ? inputValue : ""}
              disabled={isEditable}
              onChange={(event) => setInputValue(event.target.value as string)}
              onKeyDown={handleOnKeyPress}
              onBlur={handleOnBlur}
              tagName="p"
              id={name}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InputSettings;
