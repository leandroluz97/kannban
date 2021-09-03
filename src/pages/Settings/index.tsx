import React from "react";
import styles from "./styles.module.scss";
import InputSetting from "../../components/InputSetting";
import Switcher from "../../components/Switcher";

const Settings = () => {
  return (
    <div className={styles.settings}>
      <div className={styles.settings__inputs}>
        <div>
          <InputSetting label="Name" />
        </div>
        <div>
          <InputSetting label="First Name" />
        </div>
        <div>
          <InputSetting label="Last Name" />
        </div>
        <div>
          <InputSetting label="Email" />
        </div>
        <div>
          <Switcher />
        </div>
      </div>
    </div>
  );
};

export default Settings;
