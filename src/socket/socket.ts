import { io, Socket } from "socket.io-client";

const URL = "http://localhost:3000";
const socket: Socket = io(URL, {
  withCredentials: true,
  transports: ["websocket"], // important for upgrade
  autoConnect: false,        // DON'T auto-connect here
});

export default socket;
