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
}

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: OnlineUser[];
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

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      console.log("🔌 Socket disconnected manually.");
    }
  };

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

    setSocket(socketInstance);
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const contextValue = useMemo(
    () => ({ socket, onlineUsers, disconnectSocket }),
    [socket, onlineUsers]
  );

  if (!socket) return null;

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};
