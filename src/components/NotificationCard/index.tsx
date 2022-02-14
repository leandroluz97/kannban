import React from "react";
import styles from "./styles.module.scss";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Switcher from "./Switcher";

interface INotificationCard {
  isActive: boolean;
}

const NotificationCard = ({ isActive }: INotificationCard) => {
  return (
    <div className={styles.notificationCard}>
      <header className={styles.notificationCard__header}>
        <div className={styles.notificationCard__header__left}>
          <h3>10:30</h3>
        </div>
        <div className={styles.notificationCard__header__right}>
          <Switcher isActive={isActive} />
        </div>
      </header>
      <section className={styles.notificationCard__body}>
        <p>Need to finish the kannban app.</p>
      </section>
      <footer className={styles.notificationCard__footer}>
        <div className={styles.notificationCard__footer__left}>
          <p>Sun, March</p>
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
