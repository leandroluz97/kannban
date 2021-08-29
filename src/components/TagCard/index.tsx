import React from "react";
import styles from "./styles.module.scss";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useData } from "../../hooks/useData";

interface TagCardProps {
  color: string;
  icon?: boolean;
  name: string;
  id: string;
  isActive: boolean;
}

const TagCard = ({ color, icon = true, name, id, isActive }: TagCardProps) => {
  const { updateTag } = useData();

  const handleIsActive = async () => {
    await updateTag(id, !isActive);
  };

  return (
    <div
      className={styles.tagcard}
      style={{ backgroundColor: color }}
      onClick={handleIsActive}
    >
      <p>{name}</p>
      {icon && (
        <button>
          <CloseRoundedIcon fontSize="medium" />
        </button>
      )}
    </div>
  );
};

export default TagCard;
