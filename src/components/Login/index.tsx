import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import kannban from "../../assets/horizontal_kannban.svg";
import Input from "../Input";
import google from "../../assets/google.svg";
import Button from "../Button";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div className={styles.login}>
      <div className={styles.login__link}>
        <Link to="/signup" className={styles.login__signup}>
          Sign up
        </Link>
      </div>

      <div className={styles.login__imgbox}>
        <img src={kannban} alt="Kannban " />
      </div>

      <h1>Create Your Account</h1>

      <form action="" className={styles.login__form}>
        <Input type="text" holderText="Enter your name" />
        <Input type="email" holderText="Enter your email" />
        <Input
          type="password"
          holderText="Enter password"
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
        />
        <Input
          type="password"
          holderText="Repeat password"
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
        />

        <div className={styles.login__checkbox}>
          <label htmlFor="terms">
            <input type="checkbox" name="" id="terms" hidden />
            <span>I agree to the terms of Service and Privacy Policy</span>
          </label>
        </div>

        <Button />
      </form>

      <div className={styles.login__google}>
        <p>Or register with </p>
        <button>
          <img src={google} alt="google logo" />
        </button>
      </div>
    </div>
  );
};

export default Login;
