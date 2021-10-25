import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import queryString from "query-string";
import Messages from "../Messages/Messages";
import { useAuth } from "../Auth/Auth";
import { db, doc, getDoc } from "../firebase";
// import { arrayUnion } from "@firebase/firestore";

import ChatRoomInfo from "../ChatRoomInfo/ChatRoomInfo";

import "./Chat.css";

let socket;
function Chat({ location }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([]);

  const { signOut, userUID } = useAuth();

  const ENDPOINT = "localhost:5500";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    setName(name);
    setRoom(room);

    socket = io(ENDPOINT);
    socket.emit("joinRoom", { name: name, room: room, userUID: userUID });
    loadMessagesFromDatabase();
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    socket.on("usersInRoom", ({ users }) => {
      setUsersInRoom(users);
    });
  }, [messages]);

  async function loadMessagesFromDatabase() {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    const messagesFromDatabase = docSnap.data().messages;
    setMessages([...messagesFromDatabase]);
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { message, name, userUID });
      setMessage(" ");
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div className="chatRoomInfo">
        <ChatRoomInfo room={room} users={usersInRoom} />
      </div>
      <div>
        <button type="submit" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <div className="chatContainer">
        <div className="chatMessages">
          <Messages messages={messages} name={name} users={usersInRoom} />
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
