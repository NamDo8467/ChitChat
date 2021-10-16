import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, query, where, doc, setDoc, getDoc,updateDoc,collection } from "firebase/firestore";
// import {onAuthStateChanged} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBOzmJHWRDATtEY6YIDQxQS9T3u4lLQE0Q",
  authDomain: "chitchat-3fd54.firebaseapp.com",
  projectId: "chitchat-3fd54",
  storageBucket: "chitchat-3fd54.appspot.com",
  messagingSenderId: "533246508464",
  appId: "1:533246508464:web:23fb85ea6114631a08ea75",
};
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({ login_hint: "user@example.com" });
  googleProvider.setCustomParameters({ prompt: "select_account" });
// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({ login_hint: "user@example.com" });
// provider.setCustomParameters({ prompt: "select_account" });

const auth = getAuth(app);

// const signInWithGoogle = async () => {
//   await signInWithPopup(auth, provider);
// };

// const signOut = () => {
//   auth.signOut().then(() => {
//     window.location.replace("/");
//   });
// };
const db = getFirestore(app);

export { app, auth, db, googleProvider, signInWithPopup, createUserWithEmailAndPassword ,signInWithEmailAndPassword, query, where, collection, doc, getDoc, updateDoc, setDoc };
