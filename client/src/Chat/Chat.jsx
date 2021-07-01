import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import queryString from "query-string";
import Messages from "../Messages/Messages";

import ChatRoomInfo from "../ChatRoomInfo/ChatRoomInfo";

import "./Chat.css";

let socket;
function Chat({ location }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([]);

  const ENDPOINT = "https://chitchat1app.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT);
    socket.emit("joinRoom", { name: name, room: room });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("usersInRoom", ({ room, users }) => {
      setUsersInRoom(users);
    });
  }, [messages]);
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message, name });
      setMessage(" ");
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div className="chatRoomInfo">
        <ChatRoomInfo room={room} users={usersInRoom} />
      </div>
      <div className="chatContainer">
        <div className="chatMessages">
          <Messages messages={messages} name={name} />
        </div>
        <div className="input">
          <input
            value={message}
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(event) =>
              event.key === "Enter" ? sendMessage(event) : null
            }
          />
          <a className="sendBtn" type="submit" onClick={sendMessage}>
            SEND
          </a>
        </div>
      </div>
    </div>
  );
}

export default Chat;
