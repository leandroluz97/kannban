import React, { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";

interface DueTimeProps {
  dueDate: string;
}
const DueDate = ({ dueDate }: DueTimeProps) => {
  const { selectedTask, updateTask } = useData();

  const [dates, setDate] = useState("");

  async function handleSaveDateTimeOnBlur() {
    await updateTask({
      id: selectedTask.id,
      name: selectedTask.name,
      dueTime: dates,
      description: selectedTask.description,
      listId: selectedTask.listId,
      tags: selectedTask.tags,
    });
  }

  return (
    <div className={styles.date}>
      <h3>Due Date</h3>

      <input
        type="datetime-local"
        name=""
        id=""
        onChange={(e) => setDate(e.target.value)}
        value={dates}
        onBlur={handleSaveDateTimeOnBlur}
      />
      {/*dates.length > 0 ? (
        <button onClick={() => setDate("")}>Remove</button>
      ) : null*/}
    </div>
  );
};

export default DueDate;
