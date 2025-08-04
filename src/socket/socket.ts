import { io, Socket } from "socket.io-client";

const URL = process.env.REACT_APP_API_URL;
const socket: Socket = io(URL, {
  withCredentials: true,
  transports: ["websocket"], // important for upgrade
  autoConnect: false,        // DON'T auto-connect here
});

export default socket;
