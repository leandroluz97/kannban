import React from "react";
import Input from "../../components/Input";
import styles from "./styles.module.scss";
import Login from "../../components/Login";

const LoginPage = () => {
  return (
    <div className={styles.login}>
      <Login />
      {/*<Input />*/}
    </div>
  );
};

export default LoginPage;
