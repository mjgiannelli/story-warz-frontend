import { useEffect, useState } from "react";
import { OnlineUser, useSocketContext } from "../../context/socketContext";
import { UserDTO } from "../../api/user/user.interface";

export const useGamePlayViewController = (loggedInUserData: UserDTO) => {
  const {
    socket,
    currentPlayers,
    currentGameId,
    playerVotes,
    allPlayersVoted,
    activeGames,
    currentRound,
  } = useSocketContext();

  const [selectedVote, setSelectedVote] = useState<string | null>(null);

  const game = activeGames.find((g) => g.gameId === currentGameId);
  const host = loggedInUserData.displayName === game?.hostDisplayName;
  const handleVoteChange = (userId: string) => {
    setSelectedVote(userId);
  };

  const handleLockIn = () => {
    const selected = currentPlayers.find((u) => u.userId === selectedVote);
    if (!selected || !loggedInUserData || !currentGameId) return;

    socket?.emit("currentRoundPlayerVotes", {
      gameId: currentGameId,
      roundNumber: 1,
      playerVote: {
        voterId: loggedInUserData.id,
        gameId: currentGameId,
        vote: {
          userId: selected.userId,
          displayName: selected.displayName,
          username: selected.username,
        },
      },
    });
  };

  const handleRevealStory = () => {
    socket?.emit("revealStory", {
      gameId: currentGameId,
      roundNumber: 1,
    });
  };

  return {
    currentPlayers,
    selectedVote,
    handleVoteChange,
    handleLockIn,
    host,
    handleRevealStory,
    playerVotes,
    allPlayersVoted,
    currentRound,
  };
};
