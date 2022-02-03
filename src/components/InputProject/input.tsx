import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";

interface InputProjectType {
  handleBlur: () => void;
}

const InputProject = ({ handleBlur }: InputProjectType) => {
  const history = useHistory();
  const [projectName, setprojectName] = useState("");
  const inputEl = useRef<HTMLInputElement | null>(null);

  const { addProject } = useData();

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  function handleInput(e: any) {
    setprojectName(e.target.value);
  }

  function handleOnBlur() {
    handleBlur();
  }

  async function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey && projectName.length > 2) {
      const id = await addProject(projectName);

      handleBlur();

      history.push(`/project/${id}`);
    }
  }
  return (
    <div className={styles.inputProject}>
      <input
        ref={inputEl}
        value={projectName}
        onChange={handleInput}
        onKeyPress={handleOnKeyPress}
        onBlur={handleOnBlur}
        type="text"
        placeholder="Type here..."
      />
    </div>
  );
};

export default InputProject;
