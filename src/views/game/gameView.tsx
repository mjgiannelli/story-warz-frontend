import { LobbyProps } from "../../App.interface";
import styles from "./gameView.module.scss";
import { useGameViewController } from "./gameViewController";

const GameView: React.FC<LobbyProps> = ({ loggedInUserData }) => {
  const { currentGameId, game, currentPlayers, handleLeaveGame, host } =
    useGameViewController(loggedInUserData);

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>📚 Topic: {game?.topic}</h2>

      {game?.book && (
        <div className={styles.bookInfo}>
          <img
            src={game.book.image}
            alt={game.book.title}
            className={styles.bookImage}
          />
          <div>
            <h3>{game.book.title}</h3>
            <p>
              <strong>Authors:</strong> {game.book.authors?.join(", ")}
            </p>
            <p>{game.book.description}</p>
          </div>
        </div>
      )}

      <div className={styles.playersSection}>
        <h4>👥 Players in this Game</h4>
        <ul>
          {currentPlayers.map((player) => (
            <li key={player.userId}>
              {player.displayName} ({player.username}) {player.displayName === game?.hostDisplayName ? "(host)" : null}
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleLeaveGame} className={styles.leaveButton}>
        {host ? "Cancel Game" : "Leave Game"}
      </button>
    </div>
  );
};

export default GameView;
