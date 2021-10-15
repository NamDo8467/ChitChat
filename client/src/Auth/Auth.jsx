import React, { useState, useEffect, useContext } from "react";
import { app, auth, googleProvider, signInWithPopup } from "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signOut = async () => {
    await auth.signOut();
    window.location.replace("/");
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user.displayName);
        // window.location.replace(`/chat?name=${currentUser}&room=Javascript`);
      } else {
        setCurrentUser(null);
      }
      // console.log(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser]);
  const value = { currentUser, signInWithGoogle, signOut };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
