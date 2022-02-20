import React, { SyntheticEvent, useEffect, useState } from "react";
import { useData } from "../../../hooks/useData";
import styles from "./styles.module.scss";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

interface CalendarProps {
  date?: string;
  setDate: (date?: string) => void;
}

type DueDateType = null | Date;

const Calendar = ({ date, setDate }: CalendarProps) => {
  async function handleChange(newDate: null | Date) {
    setDate(newDate ? format(new Date(newDate), "MM/dd/yyyy h:mm aa") : undefined);
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
