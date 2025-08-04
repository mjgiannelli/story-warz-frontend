import { UserDTO } from "../../api/user/user.interface";
import { useSocketContext } from "../../context/socketContext";

export const useGameViewController = (loggedInUserData: UserDTO) => {
  const {
    currentGameId,
    activeGames,
    currentPlayers,
    socket,
    gameStarted,
    goToGamePlay,
    currentRound
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
    gameStarted,
    goToGamePlay,
    currentRound
  };
};
