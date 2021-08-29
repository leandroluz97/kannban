import React from "react";
import styles from "./styles.module.scss";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { useData } from "../../hooks/useData";

interface CommentProps {
  comment: string;
  id: string;
  createdAt: string;
}
const Comment = ({ comment, id, createdAt }: CommentProps) => {
  const { deleteComment } = useData();
  const handleDelete = async () => {
    await deleteComment(id);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.comment__header}>
        <time className={styles.comment__date}>{createdAt}</time>
        <button onClick={handleDelete}>
          <CloseRoundedIcon fontSize="large" />
        </button>
      </div>

      <div className={styles.comment__body}>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
