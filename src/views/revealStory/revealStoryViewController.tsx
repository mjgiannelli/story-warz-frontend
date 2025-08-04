import { UserDTO } from "../../api/user/user.interface";
import { useSocketContext } from "../../context/socketContext";
import { getTopScorerId } from "../../utilities/utilities";

export const useRevealStoryViewController = (loggedInUserData: UserDTO) => {
  const {
    socket,
    currentPlayers,
    currentGameId,
    playerVotes,
    allPlayersVoted,
    activeGames,
    currentRound,
    scoreBoard,
  } = useSocketContext();
  const game = activeGames.find((g) => g.gameId === currentGameId);
  console.log("game state on story reveal: ", game);
  const host = loggedInUserData.displayName === game?.hostDisplayName;
  const storyOwner = currentPlayers.find(
    (cp) => cp.userId === currentRound?.story.ownerUserId
  );
  const finalRound = currentRound?.roundNum === 8;
  const leaderId = getTopScorerId(scoreBoard);
  const currentLeader = currentPlayers.find((cp) => cp.userId === leaderId);
  return {
    host,
    scoreBoard,
    currentRound,
    currentPlayers,
    socket,
    game,
    storyOwner,
    finalRound,
    currentLeader
  };
};
