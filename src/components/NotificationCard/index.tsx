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

interface NotificationCardProps {
  deleteNotification: () => Promise<void>;
  deactivateNotification: () => Promise<void>;
  notification: INotificationCard;
}

const NotificationCard = ({ deleteNotification, deactivateNotification, notification }: NotificationCardProps) => {
  return (
    <div className={styles.notificationCard}>
      <header className={styles.notificationCard__header}>
        <div className={styles.notificationCard__header__left}>
          <h3>
            {format(new Date(notification.notificationTime), "hh:mm")}
            <span>{format(new Date(notification.notificationTime), "aa")}</span>
          </h3>
        </div>
        <div className={styles.notificationCard__header__right}>
          <Switcher isActive={notification.isActive} />
        </div>
      </header>
      <section className={styles.notificationCard__body}>
        <p>Need to finish the kannban app.</p>
      </section>
      <footer className={styles.notificationCard__footer}>
        <div className={styles.notificationCard__footer__left}>
          <p>{format(new Date(notification.notificationTime), "EE, MMMM")}</p>
        </div>
        <div className={styles.notificationCard__footer__right}>
          <div>
            <DeleteForeverIcon fontSize="large" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NotificationCard;
