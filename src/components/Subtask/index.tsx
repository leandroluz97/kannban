import React, { useRef, useState } from "react";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import styles from "./styles.module.scss";
import { Checkbox, withStyles } from "@material-ui/core";

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

const Subtask = () => {
  const [state, setstate] = useState("");
  const CheckBox = CustomCheckbox((props) => {
    return <Checkbox color="default" {...props} disableRipple size="medium" />;
  });

  const tes = useRef<HTMLParagraphElement | null>(null);

  function handleOnBlur() {
    console.log(tes.current?.innerText);
    setstate(tes.current?.innerText ? tes.current?.innerText : "");
    tes.current?.blur();
  }

  function handleOnKeyPress(event: any) {
    if (event.key === "Enter") {
      console.log(tes.current?.innerText);
      setstate(tes.current?.innerText ? tes.current?.innerText : "");
      tes.current?.blur();
    }
  }

  return (
    <div className={styles.subtask}>
      <div className={styles.subtask__form}>
        <CheckBox key={Math.random() * 1000 + 1} />

        <div className={styles.subtask__todo}>
          {/*<input type="text " />*/}
          <p
            contentEditable={true}
            onBlur={handleOnBlur}
            ref={tes}
            onKeyDown={handleOnKeyPress}
            suppressContentEditableWarning={true}
          >
            {state}
          </p>
        </div>
        <button>
          <CloseRoundedIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Subtask;
