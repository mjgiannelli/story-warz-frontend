import { useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import { UserDTO } from "../../api/user/user.interface";

export const useStorySubmissionViewController = (
  gameId: string,
  loggedInUserData: UserDTO
) => {
  const {
    socket,
    currentPlayers,
    submittedPlayers,
    currentGameId,
    activeGames,
  } = useSocketContext();
  const [stories, setStories] = useState([""]);
  const [submitted, setSubmitted] = useState(false);

  const game = activeGames.find((g) => g.gameId === currentGameId);

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

  const host = loggedInUserData.displayName === game?.hostDisplayName;

  const handleGoToWar = () => {
    socket?.emit("goToWar", {
      gameId,
    });
  };

  return {
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
  };
};
