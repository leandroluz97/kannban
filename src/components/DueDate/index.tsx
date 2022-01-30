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

    // await updateTask({
    //   id: selectedTask.id,
    //   name: selectedTask.name,
    //   dueTime: date as unknown as string,
    //   description: selectedTask.description,
    //   listId: selectedTask.listId,
    //   position: selectedTask.position,
    //   tags: selectedTask.tags,
    // });
  }

  console.log(date);

  function handleChange(d: any) {
    setDate(d);
  }

  const minTime = new Date().getHours() as unknown as Date;
  const maxTime = new Date().getHours() as unknown as Date;

  return (
    <div className={styles.date}>
      <h3>Due Date</h3>
      <DatePicker
        selected={date}
        value={date}
        onChange={handleChange}
        locale="pt-PT"
        // dateFormat="dd/MM/yyyy h:mm aa"
        showTimeSelect
        className="red-border"
        timeFormat="p"
        timeIntervals={5}
        dateFormat="Pp"
        onBlur={handleSaveDateTimeOnBlur}
        // isClearable
        minDate={new Date()}
        minTime={minTime}
        maxTime={maxTime}
      />

      {/* <input type="datetime-local" name="" id="" onChange={(e) => setDate(e.target.value)} value={dates} onBlur={handleSaveDateTimeOnBlur} /> */}
      {/* {date ? <button onClick={() => setDate(undefined)}>Remove</button> : ""} */}
    </div>
  );
};

export default DueDate;
