import React, { useState } from "react";
import {
  auth,
  db,
  doc,
  setDoc,
  createUserWithEmailAndPassword,
} from "../firebase";
function Register(props) {
  // console.log(props);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (name === "" || password === "") {
      setError("Please enter name and password");
    } else {
      setError("");
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          name,
          password
        );
        const collectionRef = doc(db, "users", response.user.uid);
        await setDoc(
          collectionRef,
          {
            email: response.user.email,
            name: "",
            password: password,
            google_login: false,
            id: response.user.uid,
            my_message: [],
            other_users: [{ messages: [], user_id: "" }],
            room: [],
          },
          { merge: true }
        );
        setError("");
        setName("");
        setPassword("");
        window.location.replace("/");
        // console.log(response.user);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
      }
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
      <a className="button" type="submit" href="/">
        Join
      </a>
    </form>
  );
}

export default Register;
