import React from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "./styles.module.scss";
import kannban from "../../assets/vertical_kannban.svg";
import Input from "../Input";
import google from "../../assets/google.svg";
import Button from "../Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

interface LoginState {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors },
  } = useForm<LoginState>();
  const { onSubmitGmail, onSigninPassword } = useAuth();

  //history route
  let history = useHistory();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleOnSubmit(data: LoginState) {
    console.log({ ...data });

    setIsLoading(true);
    try {
      await onSigninPassword(data.email, data.password);

      history.push("/dashboard");
      reset();
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleGmailSignup() {
    try {
      await onSubmitGmail();

      history.push("/dashboard");
    } catch (error) {
      toast.error(error.message, {
        bodyClassName: "toastify__error",
        className: "toastify",
      });
    }
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

      <h1>Login to your Account</h1>

      <form
        className={styles.login__form}
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

        <p className={styles.login__forgotpassword}>
          Forgot password? <Link to="/resetpassword">Click here!</Link>
        </p>

        {isLoading ? (
          <Button color={"var(--violet)"} disable={true}>
            <Spinner color="blue" />
          </Button>
        ) : (
          <Button text="Login" color={"var(--violet)"} disable={false} />
        )}
      </form>

      <div className={styles.login__google}>
        <p>Or Login with </p>
        <button onClick={handleGmailSignup}>
          <img src={google} alt="google logo" />
        </button>
      </div>
    </div>
  );
};

export default Login;
