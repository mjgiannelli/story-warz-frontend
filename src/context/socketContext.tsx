import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { io, Socket } from "socket.io-client";
import Auth from "../utilities/auth";

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
  hostDisplayName: string;
  players: string[];
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
  activeGames: ActiveGame[];
  currentGameId: string | null;
  joinGame: (gameId: string) => void;
  disconnectSocket: () => void;
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

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [activeGames, setActiveGames] = useState<ActiveGame[]>([]);

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setCurrentGameId(null);
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

    // Confirmed game join from server
    const handleGameJoined = (gameId: string) => {
      console.log("✅ Confirmed joined game:", gameId);
      setCurrentGameId(gameId);
    };

    const handleActiveGamesUpdate = (games: ActiveGame[]) => {
      console.log("📥 Received activeGames:", games);
      setActiveGames(games);
    };

    socket.on("gameJoined", handleGameJoined);
    socket.on("activeGames", handleActiveGamesUpdate);

    return () => {
      socket.off("gameJoined", handleGameJoined);
      socket.off("activeGames", handleActiveGamesUpdate);
    };
  }, [socket]);

  useEffect(() => {
    const loggedInUser = Auth.loggedIn();
    if (!loggedInUser) {
      console.log("🔒 Not logged in, socket not initialized.");
      return;
    }

    console.log("📡 Attempting socket connection...");
    const socketInstance = io("http://localhost:3000");

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
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
      setCurrentGameId(null);
      setOnlineUsers([]);
      setActiveGames([]);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      socket,
      onlineUsers,
      activeGames,
      currentGameId,
      joinGame,
      disconnectSocket,
    }),
    [socket, onlineUsers, activeGames, currentGameId]
  );

  if (!socket) return null;

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
