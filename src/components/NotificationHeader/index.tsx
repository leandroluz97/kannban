import React from "react";
import Calendar from "./Calendar";
import styles from "./styles.module.scss";

const NotificationHeader = () => {
  return (
    <header className={styles.notificationHeader}>
      <div className={styles.notificationHeader__left}>
        <input type="text" placeholder="Alarm name" />
        <div className={styles.notificationHeader__left__calendar}>
          <Calendar />
        </div>
      </div>
      <div className={styles.notificationHeader__right}>
        <button>Add New</button>
      </div>
    </header>
  );
};

export default NotificationHeader;
