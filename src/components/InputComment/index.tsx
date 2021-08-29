import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";

const InputComment = () => {
  const [value, setvalue] = useState("");

  const { addComment, comments } = useData();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const comment = value;
    if (comment.length > 0) {
      setvalue("");
      await addComment(comment);
    }
  }
  return (
    <div className={styles.inputComment}>
      <h3>Comments({comments.length})</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name=""
          id=""
          cols={30}
          rows={5}
          placeholder="Add a Comment"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        ></textarea>
        <input type="submit" value="Add Comment" />
      </form>
    </div>
  );
};

export default InputComment;
