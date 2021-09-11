import React, { SyntheticEvent } from "react";
import { useState } from "react";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";

interface DescriptionProps {
  description: string;
}

const Description = ({ description }: DescriptionProps) => {
  const { addComment, comments, selectedTask, updateTask } = useData();

  const [value, setvalue] = useState(description);
  const [focus, setFocus] = useState(false);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    await updateTask({
      id: selectedTask.id,
      name: selectedTask.name,
      dueTime: selectedTask.dueTime,
      description: value,
      listId: selectedTask.listId,
      tags: selectedTask.tags,
    });
  }

  return (
    <div className={styles.description}>
      <h3>Description</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name=""
          id=""
          cols={30}
          rows={5}
          placeholder="Add a Description"
          value={value}
          onChange={(e) => setvalue(e.target.value)}
          onFocus={() => setFocus(true)}
        ></textarea>
        {focus && <input type="submit" value="Done" />}
      </form>
    </div>
  );
};

export default Description;
