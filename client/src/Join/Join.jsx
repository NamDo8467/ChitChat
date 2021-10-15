import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Auth/Auth";
import "./Join.css";

function Join({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("Javascript");
  const [password, setPassword] = useState("")
  // const { currentUser, signInWithGoogle} = useContext(AuthContext)
  const { currentUser, signInWithGoogle } = useAuth();

  let history = useHistory();
  const handleJoin = (e) => {
    if (!name || !room) {
      e.preventDefault();
    } else {
      history.push(`/chat?name=${name}&room=${room}`);
    }
  };
  useEffect(() => {
    if (currentUser) {
      history.push(`/chat?name=${currentUser}&room=${room}`);
    }
  }, [currentUser]);

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
      <div className="passwordInput">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="roomInput">
        <select
          name="room"
          id="room"
          defaultValue={"Javascript"}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
          <option value="Ruby">Ruby</option>
        </select>
      </div>
      <a className="button" type="submit" onClick={handleJoin}>
        JOIN
      </a>
      <button type="submit" onClick={signInWithGoogle}>
        Sign In with Google
      </button>
    </form>
  );
}

export default Join;
