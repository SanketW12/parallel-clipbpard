import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const checkIsLoggedIn = (callback) => {
  return onAuthStateChanged(auth, callback);
};

const logOut = () => {
  return signOut(auth);
};

export { signIn, signUp, checkIsLoggedIn, logOut };
