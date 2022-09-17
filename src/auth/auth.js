import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase";

const signIn = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      console.log(userCredential, "Signed in");
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
};

const checkIsLoggedIn = (callback) => {
  return onAuthStateChanged(auth, callback);
};

const logOut = () => {
  return signOut(auth);
};

export { signIn, signUp, checkIsLoggedIn, logOut };
