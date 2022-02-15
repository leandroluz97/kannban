import React, { SyntheticEvent, useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import styles from "./styles.module.scss";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

interface CalendarProps {
  Calendardate?: Date;
}

type DueDateType = null | Date;

const Calendar = ({ Calendardate }: CalendarProps) => {
  const { selectedTask } = useData();

  const [date, setDate] = useState(selectedTask.dueTime ? format(new Date(selectedTask.dueTime), "MM/dd/yyyy h:mm aa") : undefined);

  useEffect(() => {
    setDate(selectedTask.dueTime ? format(new Date(selectedTask.dueTime), "MM/dd/yyyy h:mm aa") : undefined);
  }, [selectedTask]);

  async function handleSaveDateTimeOnBlur() {
    // if (!date) return;
    // await updateTask({
    //   id: selectedTask.id,
    //   name: selectedTask.name,
    //   dueTime: newDate,
    //   description: selectedTask.description,
    //   listId: selectedTask.listId,
    //   position: selectedTask.position,
    //   tags: selectedTask.tags,
    // });
  }

  async function handleChange(newDate: null | Date) {
    setDate(newDate ? format(new Date(newDate), "MM/dd/yyyy h:mm aa") : undefined);
    // if (!date) return;
  }
  const minTime = new Date().getHours() as unknown as Date;
  const maxTime = 10 as unknown as Date;

  return (
    <div className={styles.date}>
      <DatePicker
        selected={date ? new Date(date) : undefined}
        value={date}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy h:mm aa"
        showTimeSelect
        timeFormat="p"
        timeIntervals={5}
        onBlur={handleSaveDateTimeOnBlur}
        isClearable
        minDate={new Date()}
        minTime={new Date()}
        maxTime={maxTime}
        placeholderText="02/02/2022 12:00 AM"
      />
    </div>
  );
};

export default Calendar;
