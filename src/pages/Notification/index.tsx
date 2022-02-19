import React from "react";
import NotificationCard from "../../components/NotificationCard";
import NotificationHeader from "../../components/NotificationHeader";
import styles from "./styles.module.scss";

interface INotificationCard {
  id: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  notificationTime: Date;
}

const Notification = () => {
  const notifications: INotificationCard[] = [
    {
      id: "fuvb-58nbv-442eb-dff12",
      description: "Need to finish the kannban app.",
      isActive: true,
      createdAt: new Date(),
      notificationTime: new Date(),
    },
    {
      id: "fuvb-58nbv-442eb-dff12",
      description: "Need to finish the kannban app.",
      isActive: true,
      createdAt: new Date(),
      notificationTime: new Date(),
    },
    {
      id: "fuvb-58nbv-442eb-dff12",
      description: "Need to finish the kannban app.",
      isActive: true,
      createdAt: new Date(),
      notificationTime: new Date(),
    },
    {
      id: "fuvb-58nbv-442eb-dff12",
      description: "Need to finish the kannban app.",
      isActive: true,
      createdAt: new Date(),
      notificationTime: new Date(),
    },
    {
      id: "fuvb-58nbv-442eb-dff12",
      description: "Need to finish the kannban app.",
      isActive: true,
      createdAt: new Date(),
      notificationTime: new Date(),
    },
  ];
  const handleCreateNotification = async () => {
    //
  };

  const handleDeleteNotification = async () => {
    //
  };

  const handleDeactivateNotification = async () => {
    //
  };

  return (
    <section className={styles.notification}>
      <div className={styles.notification__header}>
        <NotificationHeader createNotification={handleCreateNotification} />
      </div>
      <div className={styles.notification__body}>
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            notification={notification}
            deleteNotification={handleDeleteNotification}
            deactivateNotification={handleDeactivateNotification}
          />
        ))}
      </div>
    </section>
  );
};

export default Notification;
