import React, { useState } from "react";
import styles from "./storySubmissionView.module.scss";
import { useSocketContext } from "../../context/socketContext";
import { useStorySubmissionViewController } from "./storySubmissionViewController";

interface Props {
  gameId: string;
}

const StorySubmissionView: React.FC<Props> = ({ gameId }) => {
  const {
    stories,
    handleAdd,
    handleChange,
    handleRemove,
    handleSubmit,
    submitted,
  } = useStorySubmissionViewController(gameId);
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
      <button
        onClick={handleSubmit}
        className={styles.submitButton}
        disabled={submitted}
      >
        {submitted ? "Submitted ✅" : "Submit Stories"}
      </button>
    </div>
  );
};

export default StorySubmissionView;
