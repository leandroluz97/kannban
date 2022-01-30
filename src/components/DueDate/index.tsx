import React, { useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";
import DatePicker from "react-datepicker";

interface DueTimeProps {
  dueDate: string;
}
const DueDate = ({ dueDate }: DueTimeProps) => {
  const { selectedTask, updateTask } = useData();

  const [date, setDate] = useState(undefined);

  async function handleSaveDateTimeOnBlur() {
    if (!date) return;

    await updateTask({
      id: selectedTask.id,
      name: selectedTask.name,
      dueTime: date as unknown as string,
      description: selectedTask.description,
      listId: selectedTask.listId,
      position: selectedTask.position,
      tags: selectedTask.tags,
    });
  }

  return (
    <div>
      <h3>Due Date</h3>
      <DatePicker
        selected={date}
        onChange={(d) => setDate(date)}
        locale="en-US"
        showTimeSelect
        className="red-border"
        timeFormat="p"
        timeIntervals={15}
        dateFormat="Pp"
      />

      {/* <input type="datetime-local" name="" id="" onChange={(e) => setDate(e.target.value)} value={dates} onBlur={handleSaveDateTimeOnBlur} /> */}
      {/*dates.length > 0 ? (
        <button onClick={() => setDate("")}>Remove</button>
      ) : null*/}
    </div>
  );
};

export default DueDate;
