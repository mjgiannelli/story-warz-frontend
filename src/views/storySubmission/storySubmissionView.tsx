import React from "react";
import styles from "./storySubmissionView.module.scss";
import { useStorySubmissionViewController } from "./storySubmissionViewController";
import { UserDTO } from "../../api/user/user.interface";

interface Props {
  gameId: string;
  loggedInUserData: UserDTO;
}

const StorySubmissionView: React.FC<Props> = ({ gameId, loggedInUserData }) => {
  const {
    stories,
    handleAdd,
    handleChange,
    handleRemove,
    handleSubmit,
    submitted,
    submittedPlayers,
    currentPlayers,
    host,
    handleGoToWar,
  } = useStorySubmissionViewController(gameId, loggedInUserData);
  return (
    <div className={styles.submissionContainer}>
      <h3>Submit 3–5 Stories</h3>
      {stories.map((story, idx) => (
        <div key={idx} className={styles.storyRow}>
          <textarea
            value={story}
            onChange={(e) => handleChange(e.target.value, idx)}
            placeholder={`Story ${idx + 1}`}
          />
          {stories.length > 3 && (
            <button onClick={() => handleRemove(idx)}>-</button>
          )}
        </div>
      ))}
      {stories.length < 5 && (
        <button onClick={handleAdd} className={styles.addButton}>
          + Add Story
        </button>
      )}
      {currentPlayers.length === submittedPlayers.length && host ? (
        <>
          <button onClick={handleGoToWar} className={styles.submitButton}>
            Start the War!
          </button>
        </>
      ) : currentPlayers.length === submittedPlayers.length ? (
        <p>Prepare for War!</p>
      ) : stories.length >= 3 ? (
        <>
          <button
            onClick={handleSubmit}
            className={styles.submitButton}
            disabled={submitted}
          >
            {submitted ? "Submitted ✅" : "Submit Stories"}
          </button>
        </>
      ) : null}

      <h4>Players Submissions</h4>
      <ul className={styles.playerList}>
        {currentPlayers.map((p) => (
          <li key={p.userId} className={styles.playerItem}>
            {p.displayName}
            {submittedPlayers.includes(p.userId) && (
              <span className={styles.checkmark}>✅</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorySubmissionView;
