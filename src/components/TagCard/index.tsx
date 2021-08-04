import React from "react";
import styles from "./styles.module.scss";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";

interface TagCardProps {
  color: string;
  icon?: boolean;
}

const TagCard = ({ color, icon = true }: TagCardProps) => {
  return (
    <div className={styles.tagcard} style={{ backgroundColor: color }}>
      <p>Awsome</p>
      {icon && (
        <button>
          <CloseRoundedIcon fontSize="medium" />
        </button>
      )}
    </div>
  );
};

export default TagCard;
