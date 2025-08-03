import { useState } from "react";
import { useSocketContext } from "../../context/socketContext";

export const useStorySubmissionViewController = (gameId: string) => {
  const { socket } = useSocketContext();
  const [stories, setStories] = useState([""]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (value: string, index: number) => {
    const updated = [...stories];
    updated[index] = value;
    setStories(updated);
  };

  const handleAdd = () => {
    if (stories.length < 5) setStories([...stories, ""]);
  };

  const handleRemove = (index: number) => {
    if (stories.length > 3) {
      const updated = [...stories];
      updated.splice(index, 1);
      setStories(updated);
    }
  };

  const handleSubmit = () => {
    const trimmedStories = stories.map((s) => s.trim()).filter(Boolean);
    if (trimmedStories.length < 3 || trimmedStories.length > 5) {
      alert("Please enter 3–5 stories.");
      return;
    }

    socket?.emit("playerSubmittedStories", {
      gameId,
      stories: trimmedStories,
    });
    setSubmitted(true);
  };

  return {
    stories,
    handleAdd,
    handleChange,
    handleRemove,
    handleSubmit,
    submitted,
  }

};
