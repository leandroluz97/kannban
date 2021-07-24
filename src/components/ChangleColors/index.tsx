import React, { MutableRefObject } from "react";
import styles from "./styles.module.scss";

interface ColorChangeType {
  handleColorOnBlur: () => void;
  colorRef: MutableRefObject<HTMLDivElement | null>;
  ChangeListColor: (color: string) => Promise<void>;
}

const ChangeColors = ({
  handleColorOnBlur,
  colorRef,
  ChangeListColor,
}: ColorChangeType) => {
  const colors = [
    "#8B18D1",
    "#3399AF",
    "#D03737",
    "#C2D118",
    "#33AF47",
    "#D18718",
    "#18D183",
    "#3350B9",
  ];
  return (
    <div
      className={styles.moreinfo}
      onBlur={handleColorOnBlur}
      tabIndex={-1}
      ref={colorRef}
    >
      <div className={styles.moreinfo__changeColor}>
        {colors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color }}
            onClick={() => ChangeListColor(color)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ChangeColors;
