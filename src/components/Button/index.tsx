import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
  text?: string;
  color: string;
  children?: ReactNode;
  disable: boolean;
}
const Button = ({ text, color, children, disable }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      style={{ backgroundColor: color }}
      disabled={disable}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
