import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import kannban from "../../assets/horizontal_kannban.svg";
import Input from "../Input";
import google from "../../assets/google.svg";
import Button from "../Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../Spinner";

interface ResetState {
  email: string;
}

const Reset = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,

    formState: { errors },
  } = useForm<ResetState>();

  const { resetPassword } = useAuth();

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleOnSubmit(data: ResetState) {
    console.log({ ...data });

    setIsLoading(true);
    try {
      await resetPassword(data.email);

      setIsLoading(false);
      // history.push("/signin");
    } catch (error) {
      console.log("aqui", error.message);
    }
  }

  return (
    <div className={styles.reset}>
      <div className={styles.reset__link}>
        <Link to="/login" className={styles.reset__signup}>
          Login
        </Link>
      </div>

      <div className={styles.reset__imgbox}>
        <img src={kannban} alt="Kannban " />
      </div>

      <h1>Password Reset</h1>

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

        {isLoading ? (
          <Button color={"var(--violet)"} disable={true}>
            <Spinner color="blue" />
          </Button>
        ) : (
          <Button
            text="Reset Password"
            color={"var(--violet)"}
            disable={false}
          />
        )}
      </form>
    </div>
  );
};

export default Reset;
