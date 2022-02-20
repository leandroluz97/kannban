import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface INotificationCard {
  id: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  notificationTime: Date;
}

type updateNotification = Pick<INotificationCard, "isActive" | "id">;

interface ISwitcher {
  isActive: boolean;
  deactivateNotification: (data: updateNotification) => Promise<void>;
  id: string;
  notificationTime: Date;
}

const Switcher = ({ isActive, deactivateNotification, id, notificationTime }: ISwitcher) => {
  const [isActiveState, setIsActiveState] = useState(isActive ? true : false);

  useEffect(() => {
    setIsActiveState(isActive);
  }, [isActive]);

  let css = isActiveState ? { right: "0.3rem" } : { right: "2.2rem" };
  let cssBackGround = isActiveState ? { backgroundColor: "var(--violet)" } : { backgroundColor: "var(--blue-bg)" };

  const handleSwitch = async () => {
    if (notificationTime < new Date()) return;
    await deactivateNotification({ isActive: !isActiveState, id: id });
    setIsActiveState(!isActiveState);
  };
  return (
    <div className={styles.switcher} onClick={() => handleSwitch()}>
      <div role="button" className={styles.switcher__track} style={cssBackGround} onClick={() => {}}>
        <div className={styles.switcher__thumb} style={css}></div>
      </div>
    </div>
  );
};

export default Switcher;
