import { useState, useEffect } from "react";
import { UserDTO } from "../../api/user/user.interface";
import { Book } from "../../App.interface";
import { useSocketContext } from "../../context/socketContext";
import Auth from "../../utilities/auth";

export const useGameViewController = (loggedInUserData: UserDTO) => {
  const {
    currentGameId,
    activeGames,
    currentPlayers,
    socket,
    gameStarted,
  } = useSocketContext();

  const game = activeGames.find((g) => g.gameId === currentGameId);

  const handleLeaveGame = () => {
    if (!socket || !currentGameId) return;
    socket.emit("leaveGame", currentGameId);
    // You'll want to reinitialize socket after this in the app flow
  };

  const host = loggedInUserData.displayName === game?.hostDisplayName;

  return {
    currentGameId,
    game,
    currentPlayers,
    handleLeaveGame,
    host,
    socket,
    gameStarted
  };
};
