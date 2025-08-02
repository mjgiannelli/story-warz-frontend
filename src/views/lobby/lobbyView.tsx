import { useEffect, useState } from "react";
import { useSocketContext, OnlineUser } from "../../context/socketContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./lobbyView.module.scss";
import { useLobbyViewController } from "./lobbyViewController";
import { NavProps } from "../../App.interface";
import LoadingComponent from "../../components/loading/loading";

const LobbyView: React.FC<NavProps> = ({ loggedInUser }) => {
  const {
    socket,
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
  } = useLobbyViewController(loggedInUser);

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

            <div style={{ display: "flex" }}>
              <input
                className={styles.input}
                placeholder="Topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <>
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
              </>
            </div>
            {book ? (
              <div>
                <p>{book.title}</p>
                <img src={book.image} alt="book"></img>
                <p>Authors: {book.authors}</p>
                <p>{book.description}</p>
              </div>
            ) : null}
            <button className={styles.modalButton} onClick={handleCreateGame}>
              Create Game
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
