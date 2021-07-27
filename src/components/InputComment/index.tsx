import React from "react";
import styles from "./styles.module.scss";

const InputComment = () => {
  return (
    <div className={styles.inputComment}>
      <p>Comments(3)</p>
      <form>
        <textarea
          name=""
          id=""
          cols={30}
          rows={5}
          placeholder="Add a Comment"
        ></textarea>
        <input type="submit" value="Add Comment" />
      </form>
    </div>
  );
};

export default InputComment;
