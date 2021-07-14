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
  label,
  property,
  error,
  type,
  name,
  visible,
  handleShowPassword,
}: InputProps) => {
  const inputStyle = error
    ? `${styles.input} ${styles.input__error}`
    : `${styles.input}`;

  let input = (
    <>
      <div>
        <input
          {...property}
          type={type}
          id={name}
          className={inputStyle}
          placeholder={label}
        />
        {visible && (
          <img
            src={visible ? closeEye : eye}
            alt="eye"
            onClick={handleShowPassword}
          />
        )}
      </div>
      {error && <span className={styles.group__error}>{error.message}</span>}
    </>
  );
  if (type === "password") {
    input = (
      <>
        <div>
          <input
            type={visible ? "text" : "password"}
            {...property}
            id={name}
            className={inputStyle}
            placeholder={label}
          />
          <img
            src={visible ? closeEye : eye}
            alt="eye"
            onClick={handleShowPassword}
          />
        </div>
        {error && <span className={styles.group__error}>{error.message}</span>}
      </>
    );
  }

  return <div className={styles.group}>{input}</div>;
};

export default Input;
