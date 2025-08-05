// components/Header.tsx
import styles from "./header.module.scss";
import { useSocketContext } from "../../context/socketContext";
import { UserDTO } from "../../api/user/user.interface";

interface HeaderProps {
  onLogout: () => void;
  loggedInUserData: UserDTO;
}

export default function Header({ onLogout, loggedInUserData }: HeaderProps) {
  const { socket } = useSocketContext();

  const handleReset = () => {
    console.log("resetting user");
    console.log("socket: ", socket);
    socket?.emit("resetUser");
  };

  return (
    <header className={styles.header}>
      <div
        className={styles.swName}
        style={{ color: "white", fontFamily: "Bangers" }}
      >
        <span style={{ color: "red" }}>STORY</span> WARZ
      </div>
      <div className={styles.buttonGroup}>
        {loggedInUserData.id === "47dbed24-1122-4034-9bc5-a8f27289df94" ? (
          <button className={styles.button} onClick={handleReset}>
            Reset
          </button>
        ) : null}
        <button className={styles.button} onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
