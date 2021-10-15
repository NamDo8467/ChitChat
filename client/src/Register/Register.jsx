import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";
function Register(props) {
  console.log(props);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (name == "" || password == "") {
      setError("Please enter name and password");
    } else {
      setError("");
      setName("");
      setPassword("");
      const collectionRef = collection(db, "users");
      await addDoc(collectionRef, {
        name: name,
        password: password,
        google_login: false,
        email: "",
        id: "",
        my_message: [],
        other_users: [{ messages: [], user_id: "" }],
        room: [],
      });
      window.location.replace("/join");
    }
  };

  return (
    <form>
      <div className="greeting">
        <h1>Welcome to ChitChat</h1>
      </div>
      <div className="nameInput">{error}</div>
      <div className="nameInput">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="passwordInput">
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <a className="button" type="submit" onClick={handleRegister}>
        Register
      </a>
    </form>
  );
}

export default Register;
