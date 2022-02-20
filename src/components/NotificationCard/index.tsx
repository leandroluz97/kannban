import React from "react";
import styles from "./styles.module.scss";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Switcher from "./Switcher";
import { format } from "date-fns";

interface INotificationCard {
  id: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  notificationTime: Date;
}

type updateNotification = Pick<INotificationCard, "isActive" | "id">;
interface NotificationCardProps {
  deleteNotification: (id: string) => Promise<void>;
  deactivateNotification: (data: updateNotification) => Promise<void>;
  notification: INotificationCard;
}

const NotificationCard = ({ deleteNotification, deactivateNotification, notification }: NotificationCardProps) => {
  return (
    <div className={styles.notificationCard} style={{ opacity: notification.isActive ? "1" : "0.3" }}>
      <header className={styles.notificationCard__header}>
        <div className={styles.notificationCard__header__left}>
          <h3>
            {format(new Date(notification.notificationTime), "hh:mm")}
            <span>{format(new Date(notification.notificationTime), "aa")}</span>
          </h3>
        </div>
        <div className={styles.notificationCard__header__right}>
          <Switcher
            isActive={notification.isActive}
            deactivateNotification={deactivateNotification}
            id={notification.id}
            notificationTime={notification.notificationTime}
          />
        </div>
      </header>
      <section className={styles.notificationCard__body}>
        <p>{notification.description}</p>
      </section>
      <footer className={styles.notificationCard__footer}>
        <div className={styles.notificationCard__footer__left}>
          <p>{format(new Date(notification.notificationTime), "EE dd, MMMM")}</p>
        </div>
        <div className={styles.notificationCard__footer__right}>
          <div role="button" onClick={() => deleteNotification(notification.id)}>
            <DeleteForeverIcon fontSize="large" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotificationCard;
