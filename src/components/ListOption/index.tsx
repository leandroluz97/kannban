import React, { MutableRefObject } from "react";
import styles from "./styles.module.scss";

interface RefObject<T> {
  // immutable
  readonly current: T | null;
}

interface ListOptionType {
  handleColor: () => void;
  handleMoreOtionOnBlur: () => void;
  optionRef: MutableRefObject<HTMLDivElement | null>;
}
const ListOption = ({
  handleColor,
  handleMoreOtionOnBlur,
  optionRef,
}: ListOptionType) => {
  console.log("render");

  return (
    <>
      <div
        className={styles.moreinfo}
        onBlur={handleMoreOtionOnBlur}
        tabIndex={-1}
        ref={optionRef}
      >
        <button>Rename</button>
        <button onClick={() => handleColor()}>Change Color</button>
        <button>Delete</button>
      </div>
    </>
  );
};

export default ListOption;
