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

const Notification = () => {
  const notificationsData: INotificationCard[] = [
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

  const { notifications, getAllNotifications, addNotification, updateNotification, deleteNotification } = useNotifications();

  const [notificationsDatas, setNotificationDatas] = useState(notifications);
  const [counter, setCounter] = useState(0);

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
  //         console.log("entered");

  //         outDatedNotifications.map((notify) => updateNotification({ id: notify.id, isActive: false }));
  //       }

  //       setCounter((prev) => prev + 1);
  //     }
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [counter, notifications]);

  console.log("counter: " + counter);

  const handleCreateNotification = async ({ description, notificationTime }: addNotification) => {
    await addNotification({ description, notificationTime });
  };

  const handleDeleteNotification = async (id: string) => {
    await deleteNotification(id);
  };

  const handleDeactivateNotification = async ({ isActive, id }: updateNotification) => {
    await updateNotification({ isActive, id });
  };

  console.log(notificationsDatas);

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

export default Notification;
