import React, {
  BaseSyntheticEvent,
  MouseEvent,
  MutableRefObject,
  SyntheticEvent,
} from "react";
import { useEffect } from "react";
import styles from "./styles.module.scss";

interface RefObject<T> {
  // immutable
  readonly current: T | null;
}

interface ListOptionType {
  handleColor?: () => void | undefined;
  handleMoreOtionOnBlur: () => void;
  optionRef: MutableRefObject<HTMLDivElement | null>;
  color: boolean;
}
const ListOption = ({
  handleColor,
  handleMoreOtionOnBlur,
  optionRef,
  color,
}: ListOptionType) => {
  useEffect(() => {
    //handle close calendar when clicked outsite
    const handler = (event: any) => {
      event.stopPropagation();
      if (!optionRef.current?.contains(event.target as HTMLElement)) {
        handleMoreOtionOnBlur();
      }
    };

    // close calendar when clicked outsite
    document.addEventListener("mousedown", handler);

    //clean up the mousedown effect
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <div
        className={styles.moreinfo}
        // onBlur={handleMoreOtionOnBlur}
        tabIndex={-1}
        ref={optionRef}
      >
        <button>Rename</button>
        <button onClick={handleColor}>Change Color</button>
        <button>Delete</button>
      </div>
    </>
  );
};

export default ListOption;
