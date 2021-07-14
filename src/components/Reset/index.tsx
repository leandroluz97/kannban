import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import kannban from "../../assets/horizontal_kannban.svg";
import Input from "../Input";
import google from "../../assets/google.svg";
import Button from "../Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignupState {
  email: string;
  password: string;
}

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors },
  } = useForm<SignupState>();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleOnSubmit(data: SignupState) {
    console.log({ ...data });
  }
  return (
    <div className={styles.reset}>
      <div className={styles.reset__link}>
        <Link to="/signup" className={styles.reset__signup}>
          Sign up
        </Link>
      </div>

      <div className={styles.reset__imgbox}>
        <img src={kannban} alt="Kannban " />
      </div>

      <h1>reset to your Account</h1>

      <form
        className={styles.reset__form}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Input
          property={register("email", {
            required: "Invalid email, please enter a valid email.",
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          label="Enter your email"
          type="email"
          error={errors.email}
          name="email"
        />
        <Input
          property={register("password", {
            required: "You must specify a password",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          error={errors.password}
          visible={showPassword}
          handleShowPassword={handleShowPassword}
        />

        <p className={styles.reset__forgotpassword}>
          Forgot password? <Link to="/resetpassword">Click here!</Link>
        </p>

        <Button />
      </form>

      <div className={styles.reset__google}>
        <p>Or Login with </p>
        <button>
          <img src={google} alt="google logo" />
        </button>
      </div>
    </div>
  );
};

export default Reset;
