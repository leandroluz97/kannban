import React, { KeyboardEvent, SyntheticEvent, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";

import styles from "./styles.module.scss";

interface ArchivedProjectProps {
  id: string;
  name: string;
}

const ArchivedProject = ({ id, name }: ArchivedProjectProps) => {
  return (
    <>
      <div className={styles.archived}>
        <p>{name}</p>
        <button>Restore</button>
      </div>
    </>
  );
};

export default ArchivedProject;
