import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import kannban from "../../assets/horizontal_kannban.svg";
import Input from "../Input";
import google from "../../assets/google.svg";
import Button from "../Button";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SigninState {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<SigninState>();

  const [formData, setDataForm] = useState({
    name: {
      type: "text",
      name: "name",
      placeholder: "Enter your name",
      value: "",
      validation: {
        required: true,
        isValid: false,
        errorMessage: "Invalid name. Valid name eg: John Doe",
        pattern: "",
        minLength: 2,
      },
    },
    email: {
      type: "email",
      name: "email",
      placeholder: "Enter your email",
      value: "",
      validation: {
        isValid: false,
        errorMessage: "Invalid email. Valid email eg: johndoe@gmail.com",
        minLength: null,
        pattern:
          "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/",
      },
    },
    password: {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      value: "",
      validation: {
        required: true,
        isValid: false,
        errorMessage: "Please enter a valid name,eg: John Doe",
        pattern: "",
        minLength: 8,
      },
    },
    repeatedPassword: {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
      value: "",
      validation: {
        required: true,
        isValid: false,
        errorMessage: "Please enter a valid name,eg: John Doe",
        pattern: "",
        minLength: 8,
      },
    },
  });

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }
  function handleValidation() {
    //setShowPassword(!showPassword);
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
        <Input
          property={register("name", {
            required: "Invalid name. Valid name eg: John Doe",
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
            required: "Enter your email",
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
