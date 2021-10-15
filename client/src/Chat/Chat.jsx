import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import queryString from "query-string";
import Messages from "../Messages/Messages";
import { useAuth } from "../Auth/Auth";

import ChatRoomInfo from "../ChatRoomInfo/ChatRoomInfo";

import "./Chat.css";

let socket;
function Chat({ location }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [usersInRoom, setUsersInRoom] = useState([]);

  const { signOut } = useAuth();

  const ENDPOINT = "localhost:5500";

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

  // useEffect(async () => {
  //   const documentID = "xmQmBOFfPxKbuUtM5gWc";
  //   const docReference = doc(db, "users", documentID);
  //   // console.log(docReference);
  //   const snapshot = await getDoc(docReference);
  //   if (snapshot) {
  //     // console.log(snapshot);
  //     const data = snapshot.data();
  //     // console.log(data);
  //   } else {
  //     console.log("no doc");
  //   }
  //   return function () {
  //     snapshot = "";
  //   };
  // }, []);
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
      <div>
        <button type="submit" onClick={signOut}>
          Sign Out
        </button>
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
