import React, { useState } from "react";
import styles from "./styles.module.scss";

const DueDate = () => {
  const [dates, setDate] = useState("");

  function handleSaveDateTimeOnBlur() {
    console.log(dates);
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
      {dates.length > 0 ? (
        <button onClick={() => setDate("")}>Remove</button>
      ) : null}
    </div>
  );
};

export default DueDate;
