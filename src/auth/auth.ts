import {
  createUserWithEmailAndPassword,
  NextFn,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserInfo,
} from "firebase/auth";
import { auth } from "../firebase";

type Credentials = {
  email: string;
  password: string;
};

const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const checkIsLoggedIn = (callback: (user: User) => void) => {
  return onAuthStateChanged(auth, callback as NextFn<User | null>);
};

const logOut = () => {
  return signOut(auth);
};

export { signIn, signUp, checkIsLoggedIn, logOut };
