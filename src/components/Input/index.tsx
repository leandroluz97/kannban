import styles from "./styles.module.scss";
import eye from "../../assets/Eye.svg";
import closeEye from "../../assets/Eye-closed.svg";
import { ChangeEvent } from "react";
import {
  FieldError,
  UseFormRegisterReturn,
  ValidationRule,
} from "react-hook-form";

interface InputProps {
  rules?: ValidationRule;
  name: string;
  label: string;
  type: "text" | "email" | "number" | "password";
  property: UseFormRegisterReturn;
  error: FieldError | undefined;
  visible?: boolean;
  setVisibility?: (value: boolean) => void;
  handleShowPassword?: () => void;
}

const Input = ({
  property,
  error,
  type,
  name,
  visible,
  handleShowPassword,
}: InputProps) => {
  let input = (
    <input {...property} type={type} id={name} className={styles.input} />
  );
  if (type === "password") {
    input = (
      <>
        <input
          type={visible ? "text" : "password"}
          {...property}
          id={name}
          className={styles.input}
        />
        <img
          src={visible ? closeEye : eye}
          alt="eye"
          onClick={handleShowPassword}
        />
      </>
    );
  }

  return <div className={styles.group}>{input}</div>;
};

export default Input;
