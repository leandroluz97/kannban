import React, { useState } from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import styles from "./styles.module.scss";

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 100,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(74px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "var(--blue)",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#52d869",
        border: "6px solid #fff",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.grey[400]}`,
      backgroundColor: "var(--blue)",
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  })
)(({ classes, ...props }: Props) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const Switcher = () => {
  const [theme, setTheme] = useState(false);

  let css = theme ? { right: "0.5rem" } : { right: "9rem" };

  return (
    <div className={styles.switcher}>
      {/* <IOSSwitch />*/}
      <p className={styles.switcher__label} aria-label="label">
        Appearance
      </p>

      <div className={styles.switcher__track} onClick={() => setTheme(!theme)}>
        <span>{theme ? "Light" : "Dark"}</span>
        <div className={styles.switcher__thumb} style={css}></div>
      </div>
    </div>
  );
};

export default Switcher;
