import React, { SyntheticEvent, useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";

interface DueTimeProps {
  dueDate?: Date;
}

type DueDateType = null | Date;

const DropDown = () => {
  const { selectedTask, updateTask } = useData();

  async function handleChange(newDate: null | Date) {}

  const options = ["one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three", "one", "two", "three"];
  const defaultOption = options[0];

  return (
    <div className={styles.date}>
      <h3>Swap</h3>
      <Dropdown className="dropdownRoot" options={options} onChange={() => {}} value={""} placeholder="--Chose list--" />
    </div>
  );
};

export default DropDown;
