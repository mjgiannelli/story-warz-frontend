import { LobbyProps } from "../../App.interface";
import GamePlayView from "../gamePlayView/gamePlayView";
import StorySubmissionView from "../storySubmission/storySubmissionView";
import styles from "./gameView.module.scss";
import { useGameViewController } from "./gameViewController";

const GameView: React.FC<LobbyProps> = ({ loggedInUserData }) => {
  const {
    game,
    currentPlayers,
    handleLeaveGame,
    host,
    socket,
    gameStarted,
    goToGamePlay,
  } = useGameViewController(loggedInUserData);

  return (
    <div className={styles.container}>
      {gameStarted && !goToGamePlay ? (
        <StorySubmissionView
          gameId={game?.gameId as string}
          loggedInUserData={loggedInUserData}
        />
      ) : goToGamePlay ? (
        <>
          <GamePlayView loggedInUserData={loggedInUserData} />
        </>
      ) : (
        <>
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
                  {player.displayName} ({player.username}){" "}
                  {player.displayName === game?.hostDisplayName
                    ? "(host)"
                    : null}
                </li>
              ))}
            </ul>
          </div>

          <button onClick={handleLeaveGame} className={styles.leaveButton}>
            {host ? "Cancel Game" : "Leave Game"}
          </button>
          {host && currentPlayers.length > 2 && (
            <button
              onClick={() => socket?.emit("startGame", game?.gameId)}
              className={styles.startButton}
            >
              Start Game
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default GameView;
