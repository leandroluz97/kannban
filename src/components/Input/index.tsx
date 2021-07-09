import styles from "./styles.module.scss";

const Input = () => {
  return (
    <div className={styles.group}>
      <input
        type="text"
        placeholder="Enter your name"
        className={styles.input}
      />
    </div>
  );
};

export default Input;
