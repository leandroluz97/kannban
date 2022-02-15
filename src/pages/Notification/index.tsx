import React from "react";
import NotificationCard from "../../components/NotificationCard";
import NotificationHeader from "../../components/NotificationHeader";
import styles from "./styles.module.scss";

const Notification = () => {
  return (
    <section className={styles.notification}>
      <div className={styles.notification__header}>
        <NotificationHeader />
      </div>
      <div className={styles.notification__body}>
        <NotificationCard isActive={true} />
        <NotificationCard isActive={false} />
        <NotificationCard isActive={true} />
        <NotificationCard isActive={false} />
        <NotificationCard isActive={true} />
        <NotificationCard isActive={false} />
        <NotificationCard isActive={false} />
        <NotificationCard isActive={true} />
      </div>
    </section>
  );
};

export default Notification;
