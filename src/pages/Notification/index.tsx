import React, { useEffect, useState } from "react";
import { setInterval } from "timers";
import EmptyState from "../../components/EmptyState";
import NotificationCard from "../../components/NotificationCard";
import NotificationHeader from "../../components/NotificationHeader";
import { useNotifications } from "../../hooks/useNotifications";
import styles from "./styles.module.scss";

interface INotificationCard {
  id: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  notificationTime: Date;
}
type addNotification = Pick<INotificationCard, "description" | "notificationTime">;
type updateNotification = Pick<INotificationCard, "isActive" | "id">;

const NotificationPage = () => {
  const { notifications, getAllNotifications, addNotification, updateNotification, deleteNotification } = useNotifications();

  const [notificationsDatas, setNotificationDatas] = useState(notifications);

  useEffect(() => {
    (async function () {
      await getAllNotifications();
    })();
  }, []);

  useEffect(() => {
    setNotificationDatas(notifications.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1)));
  }, [notifications]);

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     if (notifications.length > 0) {
  //       let outDatedNotifications = notifications.filter((notify) => notify.notificationTime <= new Date() && notify.isActive === true);

  //       if (outDatedNotifications.length > 0) {
  //         outDatedNotifications.map((notify) => updateNotification({ id: notify.id, isActive: false }));

  //         if (Notification.permission === "granted") {
  //           outDatedNotifications.forEach((notify) => {
  //             new Notification(`Notification for ${notify.description} its on time!! `);
  //           });
  //         }
  //       }

  //       setCounter((prev) => prev + 1);
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [counter, notifications]);

  const handleCreateNotification = async ({ description, notificationTime }: addNotification) => {
    await addNotification({ description, notificationTime });
  };

  const handleDeleteNotification = async (id: string) => {
    await deleteNotification(id);
  };

  const handleDeactivateNotification = async ({ isActive, id }: updateNotification) => {
    await updateNotification({ isActive, id });
  };

  return (
    <section className={styles.notification}>
      <div className={styles.notification__header}>
        <NotificationHeader createNotification={handleCreateNotification} />
      </div>
      {notificationsDatas.length > 0 ? (
        <div className={styles.notification__body}>
          {notificationsDatas.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              deleteNotification={handleDeleteNotification}
              deactivateNotification={handleDeactivateNotification}
            />
          ))}
        </div>
      ) : (
        <section className={styles.notifications__emptyState}>
          <EmptyState title="Empty Notifications" text="You dont have any notification yet." />
        </section>
      )}
    </section>
  );
};

export default NotificationPage;
