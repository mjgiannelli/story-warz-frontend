import styles from "../login/loginView.module.scss";
import { useNavigate } from "react-router-dom";
import useSignUpViewController from "./signUpViewController";
import swLogo from "../../assets/images/swLogo.png";
import LoadingComponent from "../../components/loading/loading";

const SignUpView: React.FC = () => {
  const {
    username,
    password,
    displayName,
    handleUsernameChange,
    handlePasswordChange,
    handleDisplayNameChange,
    handleSignUp,
    errorMessage,
    loading,
  } = useSignUpViewController();

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p
        className={styles.swName}
        style={{ color: "white", fontFamily: "Bangers" }}
      >
        <span style={{ color: "red" }}>STORY</span> WARZ
      </p>
      <img src={swLogo} alt="Logo" className={styles.logo} />
      <div className={styles.card}>
        <>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <div className={styles.title}>Sign Up</div>
              <input
                className={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUsernameChange}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password - 8 chars"
                value={password}
                onChange={handlePasswordChange}
              />
              <input
                className={styles.input}
                type="text"
                placeholder="Display Name"
                value={displayName}
                onChange={handleDisplayNameChange}
              />
              <button className={styles.button} onClick={handleSignUp}>
                Sign Up
              </button>
              <div
                className={styles.toggleText}
                onClick={() => navigate("/login")}
              >
                Already have an account? Login
              </div>
              {errorMessage ? (
                <p className={styles.errorMess}>{errorMessage}</p>
              ) : null}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default SignUpView;
