import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import InputSetting from "../../components/InputSetting";
import Switcher from "../../components/Switcher";
import { useAuth } from "../../hooks/useAuth";
import Users from "../../utils/user";
import { CircularProgress } from "@material-ui/core";

const Settings = () => {
  const { getUserInfo, currentUserOnSettings } = useAuth();

  useEffect(() => {
    async function getUser() {
      await getUserInfo();
    }
    getUser();
  }, []);


  return (
    <>
      {currentUserOnSettings?.email ?
        <div className={styles.settings}>
          <div className={styles.settings__inputs}>
            <div>
              <img src={currentUserOnSettings?.photoURL} alt="perfil" />
            </div>
            <div>
              {currentUserOnSettings?.displayName && <InputSetting
                label="Name"
                value={currentUserOnSettings?.displayName}
                name="displayName"
              />}
            </div>
            <div>
              {currentUserOnSettings?.firstName && <InputSetting
                label="First Name"
                value={currentUserOnSettings?.firstName as string}
                name="firstName"
              />}
            </div>
            <div>
              {currentUserOnSettings?.lastName && <InputSetting
                label="Last Name"
                value={currentUserOnSettings?.lastName as string}
                name="lastName"
              />}
            </div>
            <div>
              {currentUserOnSettings?.email && <InputSetting
                label="Email"
                value={currentUserOnSettings?.email as string}
                name="email"
                isEditable={true}
              />}
            </div>
            <div>
              <Switcher />
            </div>
          </div>
        </div> : <div className={styles.progress__wrapper}><CircularProgress size={30} /></div>}
    </>

  );
};

export default Settings;
