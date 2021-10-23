import React from "react";
import "./Message.css";
import { useAuth } from "../../Auth/Auth";
import { doc, db, updateDoc } from "../../firebase";
import { arrayUnion } from "@firebase/firestore";
let isFound;
function Message({ message, user, name, usersInRoom, userUID }) {
  let text = message;
  const saveMessageToDB = () => {
    usersInRoom.map(async (user) => {
      const documentRef = doc(db, "users", user.userUID);
      await updateDoc(documentRef, {
        room: "Javascript",
        messages: arrayUnion({ content: `${message}`, userUID: `${userUID}` }),
      });
    });
  };
  if (user == name) {
    try {
      saveMessageToDB();
    } catch (error) {
      console.log(error);
    }

    return (
      <div className="messageContainer">
        <div className="whiteBg">
          <p className="whiteUser">{user}</p>
          <div className="whiteMessage">{message}</div>
        </div>
      </div>
    );
  }
  isFound = text.search(/\bchat/);

  if (message == "Welcome to the chat" || isFound > 0) {
    return (
      <div className="messageContainer">
        <div className="blueBg">
          <p className="blueUser">{user}</p>
          <div className="blueMessage" style={{ fontSize: "13px" }}>
            {message}
          </div>
        </div>
      </div>
    );
  } else {
    // console.log(userUID);
    try {
      saveMessageToDB();
    } catch (error) {
      console.log(error);
    }
    return (
      <div className="messageContainer">
        <div className="blueBg">
          <p className="blueUser">{user}</p>
          <div className="blueMessage">{message}</div>
        </div>
      </div>
    );
  }
}

export default Message;
