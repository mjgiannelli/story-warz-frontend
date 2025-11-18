import React from "react";
import styles from "./gamePlayView.module.scss";
import { useGamePlayViewController } from "./gamePlayViewController";
import { LobbyProps } from "../../App.interface";
import RevealStoryView from "../revealStory/revealStoryView";

const GamePlayView: React.FC<LobbyProps> = ({ loggedInUserData }) => {
  const {
    currentPlayers,
    selectedVote,
    handleVoteChange,
    handleLockIn,
    handleRevealStory,
    playerVotes,
    allPlayersVoted,
    host,
    currentRound,
    scoreBoardUpdated,
    playerVoted,
  } = useGamePlayViewController(loggedInUserData);

  return (
    <div className={styles.container}>
      <>
        {scoreBoardUpdated ? (
          <RevealStoryView loggedInUserData={loggedInUserData} />
        ) : (
          <>
            <h2>
              Story #{currentRound?.roundNum}: {currentRound?.storyContent}
            </h2>
            <div className={styles.playersList}>
              {currentPlayers.map((player) => (
                <div key={player.userId} className={styles.playerVote}>
                  <span className={styles.playerName}>
                    {player.displayName}
                  </span>
                  <span className={styles.voteArrow}>→</span>
                  <span className={styles.votedName}>
                    {playerVotes.find((pv) => pv.voterId === player.userId)
                      ?.vote.displayName || "—"}
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.voteSection}>
              <h3>Your Vote</h3>
              <select
                value={selectedVote || ""}
                onChange={(e) => handleVoteChange(e.target.value)}
                className={styles.dropdown}
              >
                <option value="">Select a player</option>
                {currentPlayers
                  .filter((p) => p.userId !== loggedInUserData?.id)
                  .map((p) => (
                    <option key={p.userId} value={p.userId}>
                      {p.displayName}
                    </option>
                  ))}
              </select>
              {!playerVoted ? (
                <button className={styles.lockInButton} onClick={handleLockIn}>
                  Lock In
                </button>
              ) : null}
            </div>

            {allPlayersVoted && host && (
              <button
                onClick={handleRevealStory}
                className={styles.revealButton}
              >
                Reveal Story
              </button>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default GamePlayView;
