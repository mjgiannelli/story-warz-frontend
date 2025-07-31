import styles from "./loginView.module.scss";
import { useNavigate } from "react-router-dom";
import useLoginViewController from "./loginViewController";
import swLogo from "../../assets/images/swLogo.png";
import LoadingComponent from "../../components/loading/loading";
import { NavProps } from "../../App.interface";

const LoginView: React.FC<NavProps> = ({ loggedInUser}) => {
  const {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin,
    errorMessage,
    loading,
  } = useLoginViewController( loggedInUser);

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
              <div className={styles.title}>Login</div>
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
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                className={styles.button}
                onClick={(e) => {
                  handleLogin(
                    e as React.MouseEvent<HTMLButtonElement> | KeyboardEvent
                  );
                }}
              >
                Login
              </button>
              <div
                className={styles.toggleText}
                onClick={() => navigate("/sign-up")}
              >
                Don't have an account? Sign up
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

export default LoginView;
