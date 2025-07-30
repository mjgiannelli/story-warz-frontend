import styles from './loginView.module.scss';
import { useNavigate } from 'react-router-dom';
import useLoginViewController from './loginViewController';
import swLogo from "../../assets/images/swLogo.png";

const LoginView: React.FC = () =>  {
  const {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleLogin
  } = useLoginViewController();

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.swName} style={{ color: "white", fontFamily: "Bangers" }}>
        <span style={{ color: "red" }}>STORY</span> WARZ
      </p>
      <img src={swLogo} alt="Logo" className={styles.logo} />
      <div className={styles.card}>
        <div className={styles.title}>Login</div>
        <input className={styles.input} type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input className={styles.input} type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button className={styles.button} onClick={handleLogin}>Login</button>
        <div className={styles.toggleText} onClick={() => navigate('/sign-up')}>Don't have an account? Sign up</div>
      </div>
    </div>
  );
}

export default LoginView;