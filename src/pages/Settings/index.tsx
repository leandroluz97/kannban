import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import InputSetting from "../../components/InputSetting";
import Switcher from "../../components/Switcher";
import { useAuth } from "../../hooks/useAuth";
import Users from "../../utils/user";

const Settings = () => {
  const { currentUser, setCurrentUser, getUserInfo } = useAuth();

  useEffect(() => {
    async function getUser() {
      // await getUserInfo();
    }
    getUser();
  }, []);

  return (
    <div className={styles.settings}>
      <div className={styles.settings__inputs}>
        <div>
          <img src={currentUser?.photoURL} alt="perfil" />
        </div>
        <div>
          <InputSetting
            label="Name"
            value={currentUser?.displayName}
            name="displayname"
          />
        </div>
        <div>
          <InputSetting
            label="First Name"
            value={currentUser?.firstName as string}
            name="firstname"
          />
        </div>
        <div>
          <InputSetting
            label="Last Name"
            value={currentUser?.lastName as string}
            name="lastname"
          />
        </div>
        <div>
          <InputSetting
            label="Email"
            value={currentUser?.email as string}
            name="email"
            isEditable={true}
          />
        </div>
        <div>
          <Switcher />
        </div>
      </div>
    </div>
  );
};

export default Settings;
