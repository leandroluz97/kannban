import React, { ReactNode, useEffect } from "react";

import styles from "./styles.module.scss";

interface PaperCardProps {
  children: ReactNode;
  paperRef: any;
  handleBlur: () => void;
  left: string;
  top: string;
}

const PaperCard = ({
  children,
  paperRef,
  handleBlur,
  left,
  top,
}: PaperCardProps) => {
  useEffect(() => {
    //handle close calendar when clicked outsite
    const handler = (event: any) => {
      event.stopPropagation();
      if (!paperRef.current?.contains(event.target as HTMLElement)) {
        handleBlur();
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
    <div
      className={styles.papercard}
      tabIndex={-1}
      ref={paperRef}
      style={{ left: `${left}rem`, top: `${top}rem` }}
    >
      {children}
    </div>
  );
};

export default PaperCard;
