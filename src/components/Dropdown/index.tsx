import React, { SyntheticEvent, useEffect, useState } from "react";
import { useData } from "../../hooks/useData";
import styles from "./styles.module.scss";
import DatePicker from "react-datepicker";
import Dropdown from "react-dropdown";
import { stringify } from "querystring";

interface DueTimeProps {
  dueDate?: Date;
}

type DueDateType = null | Date;
type ISelected = { label: React.ReactNode; value: string };

const DropDown = () => {
  const [selected, setSelected] = useState({} as ISelected);
  const { lists, updateTask, selectedTask } = useData();
  const customListOption = lists.map((list) => ({ value: list.id, label: list.name })).filter((list) => list.value !== selectedTask.listId);
  let listOption = [{ value: "reset", label: "--Chose list--" }].concat(customListOption);

  async function handleSubmit(e: ISelected) {
    await updateTask({ ...selectedTask, listId: selected.value });
    setSelected({} as ISelected);
  }

  return (
    <div className={styles.dropdown}>
      <h3 className={styles.dropdown__title}>Swap</h3>
      <div className={styles.dropdown__body}>
        <Dropdown
          className="dropdownRoot"
          options={listOption}
          onChange={(e) => {
            if (e.value === "reset") {
              setSelected({} as ISelected);
            } else {
              setSelected(e);
            }
          }}
          value={""}
          placeholder="--Chose list--"
        />
        {Object.keys(selected).length !== 0 && <button onClick={() => handleSubmit(selected)}>Ok</button>}
      </div>
    </div>
  );
};

export default DropDown;
