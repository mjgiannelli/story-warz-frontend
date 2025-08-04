import { LobbyProps } from "../../App.interface";
import styles from "./revealStoryView.module.scss";
import { useRevealStoryViewController } from "./revealStoryViewController";

const RevealStoryView: React.FC<LobbyProps> = ({ loggedInUserData }) => {
  const {
    host,
    scoreBoard,
    currentRound,
    currentPlayers,
    socket,
    game,
    storyOwner,
    finalRound,
    currentLeader,
  } = useRevealStoryViewController(loggedInUserData);

  return (
    <div className={styles.revealContainer}>
      <h2 className={styles.title}>📖 Story Revealed!</h2>

      <div className={styles.storyBox}>
        <p className={styles.storyText}>{currentRound?.story.content}</p>
        <p className={styles.storyOwner}>
          Story #{currentRound?.roundNum} belongs to: {storyOwner?.displayName}{" "}
          - @{storyOwner?.username}
        </p>
      </div>

      <div className={styles.scoreboard}>
        <h3>🏆 {finalRound ? "Current" : "Final"} Scoreboard</h3>
        <ul className={styles.scoreList}>
          {scoreBoard.map((player) => {
            const playerInfo = currentPlayers.find(
              (cp) => cp.userId === player.userId
            );
            const currentlyLeading =
              playerInfo?.userId === currentLeader?.userId;
            return (
              <li key={player.userId} className={styles.scoreItem}>
                {currentlyLeading && finalRound ? <p>Your Winner: </p> : null}
                <span className={styles.playerName}>
                  {playerInfo?.displayName} - @{playerInfo?.username}
                </span>
                <span className={styles.points}>{player.points}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {host && !finalRound ? (
        <button
          onClick={() =>
            socket?.emit("startNextRound", {
              gameId: game?.gameId,
              roundNumber: currentRound?.roundNum,
            })
          }
          className={styles.startButton}
        >
          Next Round
        </button>
      ) : host && finalRound ? (
        <button
          onClick={() =>
            socket?.emit("endGame", {
              gameId: game?.gameId,
            })
          }
          className={styles.startButton}
        >
          End Game
        </button>
      ) : null}
    </div>
  );
};

export default RevealStoryView;
