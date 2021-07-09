import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import kannban from "../../assets/horizontal_kannban.svg";
import Input from "../Input";
import google from "../../assets/google.svg";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login__link}>
        <Link to="/signup" className={styles.login__signup}>
          Sign up
        </Link>
      </div>

      <div>
        <img src={kannban} alt="Kannban " />
      </div>

      <h1>Create Your Account</h1>

      <form action="" className={styles.login__form}>
        <Input />
        <Input />
        <Input />
        <Input />

        <div>
          <input type="checkbox" name="" id="" />
        </div>

        <button>Registen</button>
      </form>

      <div>
        <p>Or register with </p>
        <img src={google} alt="google logo" />
      </div>
    </div>
  );
};

export default Login;
