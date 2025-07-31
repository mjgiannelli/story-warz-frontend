import { NavProps } from "../../App.interface";
import useProfileViewController from "./profileViewController";
import styles from "./profileView.module.scss";
import placeholderImage from "../../assets/images/placeholderImg.png";
import { randomUUID } from "crypto";
import LoadingComponent from "../../components/loading/loading";

const ProfileView: React.FC<NavProps> = ({ loggedInUser }) => {
  const { profile, errorMessage, loading } =
    useProfileViewController(loggedInUser);
  console.log("profile: ", profile);
  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
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
            <h3>Game Lobby</h3>
            <div className={styles.lobbyPlaceholder}>
              <p>Join a game, start a new story, or invite friends!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileView;
