import styles from "./styles.module.scss";
import Signup from "../../components/Signup";

const SignupPage = () => {
  return (
    <div className={styles.signup}>
      <Signup />
      {/*<Input />*/}
    </div>
  );
};

export default SignupPage;
