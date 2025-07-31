import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./landingView.module.scss";
import gdLogo from "../../assets/images/gdLogo.png";
import swLogo from "../../assets/images/swLogo.png";
import { NavProps } from "../../App.interface";

const LandingView: React.FC<NavProps> = ({ loggedInUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/profile");
    }
  }, []);

  const handleClick = () => {
    const audio = new Audio("/intro.mp3");
    audio.play().catch(console.error);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  return (
    <div className={styles.container}>
      <p
        className={styles.swName}
        style={{ color: "white", fontFamily: "Bangers" }}
      >
        <span style={{ color: "red" }}>STORY</span> WARZ
      </p>
      <img src={swLogo} alt="Logo" className={styles.logo} />
      <button className={styles.enterButton} onClick={handleClick}>
        Enter
      </button>
      <img src={gdLogo} alt="Logo" className={styles.logo} />
    </div>
  );
};

export default LandingView;
