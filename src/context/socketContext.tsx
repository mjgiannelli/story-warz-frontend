/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { io, Socket } from "socket.io-client";
import { Book, LoggedInUserProps, UserScore } from "../App.interface";
import { PlayerVote, RoundDTO } from "../api/round/round.interface";
import { StoryDTO } from "../api/story/story.interface";

export interface OnlineUser {
  socketId: string;
  userId: string;
  username: string;
  displayName: string;
  gameId?: string;
}

export interface ActiveGame {
  gameId: string;
  topic: string;
  book: Book;
  hostDisplayName: string;
  players: string[];
  currentRoundNum: number;
  roundResults: RoundDTO[];
  stories: StoryDTO[];
  creatorId: string;
  started: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
  activeGames: ActiveGame[];
  currentGameId: string | null;
  gameStarted: boolean;
  joinGame: (gameId: string) => void;
  disconnectSocket: () => void;
  currentPlayers: OnlineUser[]; // ✅ Add this
  submittedPlayers: string[];
  currentRound: RoundDTO | undefined;
  goToGamePlay: boolean;
  playerVotes: PlayerVote[];
  allPlayersVoted: boolean;
  scoreBoard: UserScore[];
  scoreBoardUpdated: boolean;
  currentRoundStoryOwnerId: string;
  createGameError: string | null;
  setCreateGameError: Dispatch<SetStateAction<string | null>>;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context)
    throw new Error(
      "useSocketContext must be used within a <SocketProvider />"
    );
  return context;
};

export const SocketProvider = ({
  children,
  loggedInUser,
}: {
  children: React.ReactNode;
  loggedInUser: LoggedInUserProps | null;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [createGameError, setCreateGameError] = useState<string | null>(null);
  const [activeGames, setActiveGames] = useState<ActiveGame[]>([]);
  const [currentPlayers, setCurrentPlayers] = useState<OnlineUser[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const currentGameIdRef = useRef<string | null>(null);
  const [submittedPlayers, setSubmittedPlayers] = useState<string[]>([]);
  const [playerVotes, setPlayerVotes] = useState<PlayerVote[]>([]);
  const [allPlayersVoted, setAllPlayersVoted] = useState<boolean>(false);
  // need to remove data here that will show people the answers
  // only send the content, gameId, createdDate
  // have the server keep track of score
  const [currentRound, setCurrentRound] = useState<RoundDTO | undefined>();
  const [currentRoundStoryOwnerId, setCurrentRoundStoryOwnerId] =
    useState<string>("");
  const [goToGamePlay, setGoToGameplay] = useState<boolean>(false);
  const [scoreBoard, setScoreBoard] = useState<UserScore[]>([]);
  const [scoreBoardUpdated, setScoreBoardUpdated] = useState<boolean>(false);

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setCurrentGameId(null);
      currentGameIdRef.current = null;
      setOnlineUsers([]);
      setActiveGames([]);
      console.log("🔌 Socket disconnected manually.");
    }
  };

  const joinGame = (gameId: string) => {
    if (!socket || currentGameId) return;
    socket.emit("joinGame", gameId);
    // Delaying setCurrentGameId until server confirms
  };

  useEffect(() => {
    if (!socket) return;

    const handlePlayerJoinedGame = (user: OnlineUser) => {
      console.log("🎮 Player joined game:", user);

      // If current user joined, track the game they're in
      if (loggedInUser && user.userId === loggedInUser.userId) {
        setCurrentGameId(user.gameId ?? null);
        currentGameIdRef.current = user.gameId ?? null;
      }

      // Sync the player list (prevent duplicates)
      setCurrentPlayers((prev) => {
        const exists = prev.some((p) => p.userId === user.userId);
        return exists ? prev : [...prev, user];
      });
    };

    const handleSyncPlayers = (players: OnlineUser[]) => {
      console.log("🔄 Syncing full player list:", players);
      setCurrentPlayers(players);
    };

    const handlePlayerLeftGame = (user: OnlineUser) => {
      console.log("👋 Player left game:", user);

      // If the user who left is me
      if (loggedInUser && user.userId === loggedInUser.userId) {
        setCurrentGameId(null);
        currentGameIdRef.current = null;
        setCurrentPlayers([]); // Reset players list
      }

      setCurrentPlayers((prev) => prev.filter((p) => p.userId !== user.userId));
    };

    const handleActiveGamesUpdate = (games: ActiveGame[]) => {
      console.log("📥 Received activeGames:", games);
      setActiveGames(games);
    };

    const handlePlayerKicked = () => {
      console.log("👢 You were removed from the game.");
      setCurrentGameId(null);
    };

    const handleGameStarted = ({ gameId }: { gameId: string }) => {
      console.log("gameId: ", gameId);
      console.log("currentGameId: ", currentGameIdRef.current);
      if (gameId !== currentGameIdRef.current) return;
      console.log(
        "🚀 Game started for your game:",
        gameId,
        "Submit your stories"
      );
      setGameStarted(true);
    };

    const handlePlayerSubmitted = ({ userId }: { userId: string }) => {
      setSubmittedPlayers((prev) =>
        prev.includes(userId) ? prev : [...prev, userId]
      );
    };

    const handlePlayerVoted = ({
      roundVotes,
    }: {
      roundVotes: PlayerVote[];
    }) => {
      console.log("round votes: ", roundVotes);
      setPlayerVotes(roundVotes);
    };

    const handleAllPlayersVoted = ({
      gameId,
      allVoted,
    }: {
      gameId: string;
      allVoted: boolean;
    }) => {
      setAllPlayersVoted(allVoted);
    };

    const handleGoToWar = ({ round }: { round: RoundDTO }) => {
      setCurrentRound(round);
      setGoToGameplay(true);
    };

    const handleScoreBoardUpdated = ({
      scoreBoard,
      scoreBoardUpdated,
      storyOwnerId,
    }: {
      scoreBoard: UserScore[];
      scoreBoardUpdated: boolean;
      storyOwnerId: string;
    }) => {
      setScoreBoard(scoreBoard);
      setScoreBoardUpdated(true);
      setCurrentRoundStoryOwnerId(storyOwnerId);
    };

    const handleShowNextRound = ({ nextRound }: { nextRound: RoundDTO }) => {
      setCurrentRound(nextRound);
      setAllPlayersVoted(false);
      setScoreBoardUpdated(false);
      setPlayerVotes([]);
      setCurrentRoundStoryOwnerId("");
    };

    const handleGameEnded = () => {
      console.log("🛑 Game has ended.");
      setCurrentGameId(null);
      currentGameIdRef.current = null;
      setCurrentPlayers([]);
      setGameStarted(false);
      setSubmittedPlayers([]);
      setCurrentRound(undefined);
      setGoToGameplay(false);
      setPlayerVotes([]);
      setAllPlayersVoted(false);
      setScoreBoard([]);
      setScoreBoardUpdated(false);
    };

    const handleCreateGameError = ({ message }: { message: string }) => {
      setCreateGameError(message);
    };

    socket.on("activeGames", handleActiveGamesUpdate);
    socket.on("playerKicked", handlePlayerKicked);
    socket.on("playerJoinedGame", handlePlayerJoinedGame);
    socket.on("playerLeftGame", handlePlayerLeftGame);
    socket.on("syncPlayers", handleSyncPlayers);
    socket.on("gameStarted", handleGameStarted);
    socket.on("playerSubmitted", handlePlayerSubmitted);
    socket.on("startTheWar", handleGoToWar);
    socket.on("playerVoted", handlePlayerVoted);
    socket.on("allPlayersVoted", handleAllPlayersVoted);
    socket.on("scoreBoardUpdated", handleScoreBoardUpdated);
    socket.on("showNextRound", handleShowNextRound);
    socket.on("gameEnded", handleGameEnded);
    socket.on("gameCreateError", handleCreateGameError);

    return () => {
      socket.off("activeGames", handleActiveGamesUpdate);
      socket.off("playerKicked", handlePlayerKicked);
      socket.off("playerJoinedGame", handlePlayerJoinedGame);
      socket.off("playerLeftGame", handlePlayerLeftGame);
      socket.off("syncPlayers", handleSyncPlayers);
      socket.off("gameStarted", handleGameStarted);
      socket.off("playerSubmitted", handlePlayerSubmitted);
      socket.off("startTheWar", handleGoToWar);
      socket.off("playerVoted", handlePlayerVoted);
      socket.off("allPlayersVoted", handleAllPlayersVoted);
      socket.off("scoreBoardUpdated", handleScoreBoardUpdated);
      socket.off("showNextRound", handleShowNextRound);
      socket.off("gameEnded", handleGameEnded);
      socket.off("gameCreateError", handleCreateGameError);
    };
  }, [loggedInUser, socket]);

  useEffect(() => {
    if (!loggedInUser) {
      console.log("🔒 Not logged in, socket not initialized.");
      return;
    }

    console.log("📡 Attempting socket connection...");
    const socketInstance = io(process.env.REACT_APP_API_URL);

    socketInstance.on("connect", () => {
      console.log("🟢 Connected to socket:", socketInstance.id);
      const userProfile = {
        userId: loggedInUser.userId,
        username: loggedInUser.userName,
        displayName: loggedInUser.displayName,
      };
      socketInstance.emit("registerUser", userProfile);
      socketInstance.emit("joinLobby", "lobby-1");
    });

    socketInstance.on("onlineUsers", (users: OnlineUser[]) => {
      console.log("📥 Received onlineUsers:", users);
      setOnlineUsers(users);
    });

    socketInstance.on("playerRejoinedGame", (user: OnlineUser) => {
      console.log(`🔁 Rejoined game ${user.gameId}`);
      setCurrentGameId(user.gameId || null);
      currentGameIdRef.current = user.gameId || null;
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setCurrentGameId(null);
      setOnlineUsers([]);
      setActiveGames([]);
    };
  }, [loggedInUser]);

  const contextValue = useMemo(
    () => ({
      socket,
      onlineUsers,
      activeGames,
      currentGameId,
      joinGame,
      disconnectSocket,
      currentPlayers,
      gameStarted,
      submittedPlayers,
      currentRound,
      goToGamePlay,
      playerVotes,
      allPlayersVoted,
      scoreBoard,
      scoreBoardUpdated,
      currentRoundStoryOwnerId,
      createGameError,
      setCreateGameError,
    }),
    [
      socket,
      onlineUsers,
      activeGames,
      currentGameId,
      joinGame,
      disconnectSocket,
      currentPlayers,
      gameStarted,
      submittedPlayers,
      currentRound,
      goToGamePlay,
      playerVotes,
      allPlayersVoted,
      scoreBoard,
      scoreBoardUpdated,
      currentRoundStoryOwnerId,
      createGameError,
      setCreateGameError,
    ]
  );

  if (!socket) return null;

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
