import React from "react";
import classes from "./styles.module.scss";

interface SpinnerTypes {
  color: string;
}
const Spinner = ({ color }: SpinnerTypes) => {
  //border: 3px solid var(--violet);
  //border-color: var(--violet) transparent transparent transparent;
  const cor = `var(--${color}) transparent transparent transparent;`;
  const cssStyle = { borderColor: cor };
  return (
    <div className={`${classes.ldsRing}`}>
      <div style={{ ...cssStyle }}></div>
      <div style={{ ...cssStyle }}></div>
      <div style={{ ...cssStyle }}></div>
      <div style={{ ...cssStyle }}></div>
    </div>
  );
};

export default Spinner;
