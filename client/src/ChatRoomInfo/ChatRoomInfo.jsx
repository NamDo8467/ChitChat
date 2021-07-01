import React from "react";
import "./ChatRoomInfo.css";
function ChatRoomInfo({ room, users }) {
  return (
    <section>
      <div className="roomName"><span><strong>Room:</strong> </span> {room}</div>
      <div className="users">
        <span><strong>Users:</strong></span>
          {users.map((user) => (
            <li key={user.name}>{user.name}</li>
          ))}
        
      </div>
    </section>
  );
}

export default ChatRoomInfo;
