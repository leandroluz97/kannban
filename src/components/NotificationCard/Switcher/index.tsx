import React, { useState } from "react";
import styles from "./styles.module.scss";

interface ISwitcher {
  isActive: boolean;
}

const Switcher = ({ isActive }: ISwitcher) => {
  const [isActiveState, setIsActiveState] = useState(isActive);

  let css = isActiveState ? { right: "0.3rem" } : { right: "2.2rem" };
  let cssBackGround = isActiveState ? { backgroundColor: "var(--blue-bg)" } : { backgroundColor: "var(--violet)" };

  return (
    <div className={styles.switcher} onClick={() => setIsActiveState(!isActiveState)}>
      <div role="button" className={styles.switcher__track} style={cssBackGround} onClick={() => {}}>
        <div className={styles.switcher__thumb} style={css}></div>
      </div>
    </div>
  );
};

export default Switcher;
