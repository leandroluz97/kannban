import React from "react";
import classes from "./styles.module.scss";

interface SpinnerTypes {
  color: string;
}
const Spinner = ({ color }: SpinnerTypes) => {
  return (
    <div className={classes.ldsRing}>
      <div className={classes[color]}></div>
      <div className={classes[color]}></div>
      <div className={classes[color]}></div>
      <div className={classes[color]}></div>
    </div>
  );
};

export default Spinner;
