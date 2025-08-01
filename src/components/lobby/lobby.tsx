// LobbyView.tsx
import { useOnlineUsers } from "../../context/socketContext";

const LobbyView = () => {
  const onlineUsers = useOnlineUsers();

  return (
    <div>
      🎮 <strong>Welcome to the Game Lobby!</strong>
      <div>
        <h4>Online Players</h4>
        <ul>
          {onlineUsers.map((userId) => (
            <li key={userId}>{userId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LobbyView;
