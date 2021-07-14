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
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  terms: boolean;
}

const Login = () => {
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

      <form
        className={styles.login__form}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Input
          property={register("name", {
            required: "Invalid name, please enter a valid name.",
            minLength: {
              value: 2,
              message: "Must have at least 8 characters",
            },
          })}
          label="Enter your name"
          type="text"
          error={errors.name}
          name="name"
        />
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
        <Input
          property={register("repeatPassword", {
            validate: (value) =>
              value === getValues("password") || "The passwords do not match",
          })}
          label="Repeat Password"
          type={showPassword ? "text" : "password"}
          name="repeatPassword"
          error={errors.repeatPassword}
          visible={showPassword}
          handleShowPassword={handleShowPassword}
        />

        <div className={styles.login__checkbox}>
          <label htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              hidden
              {...register("terms", {
                required: "Please, accept the Terms and Contitions.",
              })}
            />
            <span className={errors.terms?.message && styles.error}>
              I agree to the terms of Service and Privacy Policy
            </span>
          </label>
        </div>

        {<p></p>}

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
