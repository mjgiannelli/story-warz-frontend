import { useSocketContext } from "../../context/socketContext";

const LobbyView = () => {
  const { onlineUsers } = useSocketContext();

  return (
    <div>
      🎮 <strong>Welcome to the Game Lobby!</strong>
      <div>
        <h4>Online Players</h4>
        <ul>
          {onlineUsers.map((user) => (
            <li key={user.socketId}>
              <strong>{user.displayName} ({user.username})</strong> 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LobbyView;
