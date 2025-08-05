import { NavProps } from "../../App.interface";
import useProfileViewController from "./profileViewController";
import styles from "./profileView.module.scss";
import placeholderImage from "../../assets/images/placeholderImg.png";
import LoadingComponent from "../../components/loading/loading";
import LobbyView from "../lobby/lobbyView";
import { UserDTO } from "../../api/user/user.interface";
import GameView from "../game/gameView";
import Header from "../../components/header/header";

const ProfileView: React.FC<NavProps> = ({ loggedInUser }) => {
  const { profile, loading, handleLogout, currentGameId } =
    useProfileViewController(loggedInUser);
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : currentGameId ? (
        <>
          <Header
            onLogout={handleLogout}
            loggedInUserData={profile as UserDTO}
          />
          <GameView loggedInUserData={profile as UserDTO} />
        </>
      ) : (
        <>
          <Header
            onLogout={handleLogout}
            loggedInUserData={profile as UserDTO}
          />
          <div className={styles.profileContainer}>
            {/* Profile Header */}
            <div className={styles.header}>
              <img
                src={placeholderImage}
                alt="Profile"
                className={styles.profileImage}
              />
              <div className={styles.userInfo}>
                <h2>{profile?.displayName}</h2>
                <p>@{profile?.username}</p>
              </div>
            </div>

            {/* Friends Section */}
            <div className={styles.section}>
              <h3>Friends</h3>
              <ul className={styles.friendsList}>
                {profile?.friends?.map((friend, idx) => (
                  <li key={idx}>{friend.displayName}</li>
                ))}
              </ul>
            </div>

            {/* Library Section */}
            <div className={styles.section}>
              <h3>Library</h3>
              <div className={styles.bookshelf}>
                {profile?.library?.map((book) => (
                  <div className={styles.book}>
                    <img src={book.image} alt={book.title} />
                    <p>{book.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Lobby Section */}
            <div className={styles.section}>
              <LobbyView loggedInUserData={profile as UserDTO} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileView;
