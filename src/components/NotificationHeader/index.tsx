import React, { useState } from "react";
import Calendar from "./Calendar";
import styles from "./styles.module.scss";

interface INotificationCard {
  id: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  notificationTime: Date;
}

type addNotification = Pick<INotificationCard, "description" | "notificationTime">;
interface INotificationHeader {
  createNotification: ({ description, notificationTime }: addNotification) => Promise<void>;
}

const NotificationHeader = ({ createNotification }: INotificationHeader) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<string | undefined>(undefined);

  const handleOnClick = () => {
    if (!date || description.length <= 0) return;

    createNotification({ description: description, notificationTime: new Date(date) });

    setDescription("");
    setDate(undefined);
  };

  return (
    <header className={styles.notificationHeader}>
      <div className={styles.notificationHeader__left}>
        <input type="text" placeholder="Alarm name" value={description} onChange={(e) => setDescription(e.target.value)} />
        <div className={styles.notificationHeader__left__calendar}>
          <Calendar date={date} setDate={setDate} />
        </div>
      </div>
      <div className={styles.notificationHeader__right}>
        <button onClick={() => handleOnClick()}>Add New</button>
      </div>
    </header>
  );
};

export default NotificationHeader;
