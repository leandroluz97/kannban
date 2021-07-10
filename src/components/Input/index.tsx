import styles from "./styles.module.scss";
import eye from "../../assets/Eye.svg";
import closeEye from "../../assets/Eye-closed.svg";

interface InputProps {
  type: "text" | "password" | "email";
  holderText: string;
  showPassword?: boolean;
  handleShowPassword?: () => void;
}

const Input = ({
  type,
  holderText,
  showPassword,
  handleShowPassword,
}: InputProps) => {
  let input = (
    <input type={type} placeholder={holderText} className={styles.input} />
  );

  if (type === "password") {
    input = (
      <>
        <input
          type={showPassword ? "text" : "password"}
          placeholder={holderText}
          className={styles.input}
        />
        <img
          src={showPassword ? eye : closeEye}
          alt="eye"
          onClick={handleShowPassword}
        />
      </>
    );
  }

  return <div className={styles.group}>{input}</div>;
};

export default Input;
