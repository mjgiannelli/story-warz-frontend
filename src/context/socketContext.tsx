// socketContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import Auth from "../utilities/auth";

const SocketContext = createContext<Socket | null>(null);
const OnlineUsersContext = createContext<string[]>([]); // 👈 New context

export const useSocket = () => useContext(SocketContext)!;
export const useOnlineUsers = () => useContext(OnlineUsersContext); // 👈 Export hook

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]); // 👈 Hold state

  useEffect(() => {
    console.log("📡 Attempting socket connection...");
    const loggedInUser = Auth.loggedIn();
    if (loggedInUser) {
      const newSocket = io("http://localhost:3000", {
        transports: ["websocket"],
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("🟢 Connected to socket:", newSocket.id);
        newSocket.emit("joinLobby", "lobby-1"); // centralize emit here too
      });

      newSocket.on("onlineUsers", (users: string[]) => {
        console.log("📡 Received online users in context:", users);
        setOnlineUsers(users);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <OnlineUsersContext.Provider value={onlineUsers}>
        {children}
      </OnlineUsersContext.Provider>
    </SocketContext.Provider>
  );
};
