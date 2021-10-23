import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Auth/Auth";
import "./Join.css";

function Join({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("Javascript");
  const [error, setError] = useState("");
  
  const [password, setPassword] = useState("");
  // const { currentUser, signInWithGoogle} = useContext(AuthContext)
  const { currentUser, signInWithGoogle, signIn } = useAuth();

  let history = useHistory();
  // const handleJoin = (e) => {
  //   if (!name || !room) {
  //     e.preventDefault();
  //   } else {
  //     history.push(`/chat?name=${name}&room=${room}`);
  //   }
  // };

  // const signIn = async () => {
  //   try {
  //     const response = await signInWithEmailAndPassword(auth, name, password);
  //     console.log(response);
  //     setError("");
  //     setName("");
  //     setPassword("");
  //   } catch (error) {
  //     console.log(error.message);
  //     console.log(error.code);
  //     setError(error.code);
  //   }
  // };
  useEffect(() => {
    if (currentUser) {
      // console.log(currentUser);
      history.push(`/chat?name=${currentUser}&room=${room}`);
    }
  }, [currentUser, history]);

  return (
    <form>
      <div className="greeting">
        <h1>Welcome to ChitChat</h1>
      </div>
      <div className="input-fields">
        <div className="error-input">{error}</div>
        <div className="name-input">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="password-input">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="room-input">
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
      </div>
      <div className="join-register-buttons">
        <a
          className="button"
          type="submit"
          onClick={(e) => {
            signIn(name, password, room, setName, setPassword, setError);
          }}
        >
          JOIN
        </a>
        <a className="button" href="/register">
          Register
        </a>
      </div>

      <button type="submit" onClick={signInWithGoogle}>
        Sign In with Google
      </button>
    </form>
  );
}

export default Join;
