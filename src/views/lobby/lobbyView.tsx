import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./lobbyView.module.scss";
import { useLobbyViewController } from "./lobbyViewController";
import { LobbyProps } from "../../App.interface";
import LoadingComponent from "../../components/loading/loading";

const LobbyView: React.FC<LobbyProps> = ({ loggedInUserData }) => {
  const {
    onlineUsers,
    showModal,
    setShowModal,
    topic,
    setTopic,
    book,
    setBook,
    handleCreateGame,
    retreiveGoogleBook,
    bookLoading,
    createGameLoading,
    activeGames,
    joinGame,
  } = useLobbyViewController(loggedInUserData);

  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={styles.header}>🎮 Welcome to the Game Lobby!</div>

      <button
        className={styles.createButton}
        onClick={() => setShowModal(true)}
      >
        + Create Game
      </button>

      <div className={styles.gamesList}>
        <h4>Available Games</h4>
        {activeGames.length === 0 ? (
          <p className={styles.emptyMessage}>No games yet. Be the first!</p>
        ) : (
          <ul>
            {activeGames.map((game) => (
              <li key={game.gameId} className={styles.gameCard}>
                <div>
                  <strong>📚 {game.topic}</strong>
                  <div>Created by: {game.hostDisplayName}</div>
                </div>
                <button
                  className={styles.joinButton}
                  onClick={() => joinGame(game.gameId)}
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.playersList}>
        <h4>Online Players</h4>
        <ul>
          {onlineUsers.map((user) => (
            <li key={user.socketId} className={styles.player}>
              {user.displayName} ({user.username})
            </li>
          ))}
        </ul>
      </div>

      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalCard}>
            <h3>Create New Game</h3>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                className={styles.input}
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              {bookLoading ? (
                <LoadingComponent />
              ) : (
                <button
                  className={styles.modalButton}
                  onClick={retreiveGoogleBook}
                >
                  Generate Book
                </button>
              )}
            </div>

            {book && (
              <div className={styles.bookPreview}>
                <p>{book.title}</p>
                <img src={book.image} alt="book" />
                <p>Authors: {book.authors?.join(", ")}</p>
                <p>{book.description}</p>
              </div>
            )}

            <button
              className={styles.modalButton}
              onClick={handleCreateGame}
              disabled={createGameLoading}
            >
              {createGameLoading ? "Creating..." : "Create Game"}
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LobbyView;
