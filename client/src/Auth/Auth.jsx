import { arrayUnion } from "@firebase/firestore";
import React, { useState, useEffect, useContext } from "react";
import {
  db,
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  doc,
  updateDoc

} from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userUID, setUserUID] = useState(null);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signIn = async (name, password, room, setName, setPassword, setError) => {
    try {
      const response = await signInWithEmailAndPassword(auth, name, password);
      // console.log(response);
      setError("");
      setName("");
      setPassword("");
      setCurrentUser(response.user.email);
      setUserUID(response.user.uid);
      // console.log(userUID);
      // const documentRef = doc(db, "users", response.user.uid)
      // await updateDoc(documentRef, {
      //   room: arrayUnion(room)
      // })
      
    } catch (error) {
      console.log(error.message);
      console.log(error.code);
      setError(error.code);
    }
  };
  const signOut = async () => {
    await auth.signOut();
    window.location.replace("/");
  };
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setCurrentUser(user.email);
  //       // window.location.replace(`/chat?name=${currentUser}&room=Javascript`);
  //     } else {
  //       setCurrentUser(null);
  //     }
  //     // console.log(currentUser);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [currentUser]);
  const value = { currentUser, userUID, signInWithGoogle, signIn, signOut };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
