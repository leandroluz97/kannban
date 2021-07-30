import React from "react";
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
  const CheckBox = CustomCheckbox((props) => {
    return <Checkbox color="default" {...props} disableRipple size="medium" />;
  });

  return (
    <div className={styles.subtask}>
      <form>
        <CheckBox key={Math.random() * 1000 + 1} />

        <div className={styles.subtask__todo}>
          <input type="text " />
        </div>
        <button>
          <CloseRoundedIcon fontSize="large" />
        </button>
      </form>
    </div>
  );
};

export default Subtask;
