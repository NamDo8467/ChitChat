import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import './Join.css'

function Join({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("Javascript");
  let history = useHistory();
  const handleJoin = (e) => {
    if (!name || !room) {
      
      e.preventDefault();
    } else {
      history.push(`/chat?name=${name}&room=${room}`);
    }
  };
  return (
    <form>
      <div className="greeting">
        <h1>Welcome to ChitChat</h1>
      </div>
      <div className="nameInput">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="roomInput">
        <select name="room" id="room" onChange={(e) => setRoom(e.target.value)}>
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
        </select>
      </div>
      <a className='button' type='submit' onClick={handleJoin} >JOIN</a>
      {/* <button type="submit" onClick={handleJoin}>
        JOIN
      </button> */}
    </form>
  );
}

export default Join;
