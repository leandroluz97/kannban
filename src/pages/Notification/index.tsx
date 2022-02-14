import React from "react";
import NotificationCard from "../../components/NotificationCard";
import styles from "./styles.module.scss";
const Notification = () => {
  return (
    <div className={styles.notification}>
      <NotificationCard isActive={true} />
      <NotificationCard isActive={false} />
      <NotificationCard isActive={true} />
      <NotificationCard isActive={false} />
      <NotificationCard isActive={true} />
      <NotificationCard isActive={false} />
      <NotificationCard isActive={false} />
      <NotificationCard isActive={true} />
    </div>
  );
};

export default Notification;
