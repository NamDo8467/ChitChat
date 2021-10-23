import React from "react";
import Message from "./Message/Message";
import ScrollToBottom from "react-scroll-to-bottom"
import './Messages.css'

function Messages({ messages, name, users }) {
  return (
    <ScrollToBottom className="messagesContainer">
      {messages.map(message => {
        // console.log(message.userUID);
        return (
          <Message key={message.text} message={message.text} user={message.user} name={name} usersInRoom={users} userUID={message.userUID} />
        );
      })}
    </ScrollToBottom>
  );
}

export default Messages;
