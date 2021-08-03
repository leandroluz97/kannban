import React from "react";
import styles from "./styles.module.scss";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

interface TagCardProps {
  color: string;
}

const TagCard = ({ color }: TagCardProps) => {
  return (
    <div className={styles.tagcard} style={{ backgroundColor: color }}>
      <p>Awsome</p>
      <button>
        <CloseRoundedIcon fontSize="medium" />
      </button>
    </div>
  );
};

export default TagCard;
