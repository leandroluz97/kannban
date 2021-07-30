import React, { KeyboardEvent, useEffect, useRef, useState } from "react";

interface InputProjectType {
  handleBlur: () => void;
}

const InputProject = ({ handleBlur }: InputProjectType) => {
  const [projectName, setprojectName] = useState("");
  const inputEl = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputEl.current?.focus();
  }, []);

  function handleInput(e: any) {
    setprojectName(e.target.value);
  }

  function handleOnKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey && projectName.length > 2) {
      // handleCloseTextFied();
    }
  }

  function handleOnBlur() {
    handleBlur();
  }
  return (
    <div>
      <input
        ref={inputEl}
        value={projectName}
        onChange={handleInput}
        onKeyPress={handleOnKeyPress}
        onBlur={handleOnBlur}
        type="text"
      />
    </div>
  );
};

export default InputProject;
