import { useEffect } from "react";
import { useSocketContext, OnlineUser } from "../../context/socketContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LobbyView = () => {
  const { socket, onlineUsers } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handlePlayerJoined = (user: OnlineUser) => {
      console.log(`${user.displayName} joined the lobby`);
      toast.success(`${user.displayName} joined the lobby`);
    };

    const handlePlayerLeft = (user: OnlineUser) => {
      console.log(`${user.displayName} left the lobby`);
      toast.info(`${user.displayName} left the lobby`);
    };

    socket.on("playerJoined", handlePlayerJoined);
    socket.on("playerLeft", handlePlayerLeft);

    return () => {
      socket.off("playerJoined", handlePlayerJoined);
      socket.off("playerLeft", handlePlayerLeft);
    };
  }, [socket]);

  return (
    <div>
      <ToastContainer />
      🎮 <strong>Welcome to the Game Lobby!</strong>
      <div>
        <h4>Online Players</h4>
        <ul>
          {onlineUsers.map((user) => (
            <li key={user.socketId}>
              <strong>
                {user.displayName} ({user.username})
              </strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LobbyView;
