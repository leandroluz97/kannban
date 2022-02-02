import React from "react";
import kannbanLogo from "../../assets/icon_kannban.svg";
import styles from "./styles.module.scss";

const LoadingState = () => {
  return (
    <section className={styles.loadingState}>
      <img src={kannbanLogo} className={styles.loadingState__logo} alt="kannban horizontal logo" />
    </section>
  );
};

export default LoadingState;
