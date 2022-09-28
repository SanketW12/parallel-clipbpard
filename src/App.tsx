import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/login/Login";
import { useState } from "react";
import Home from "./pages/Home";
import { auth } from "./firebase";
import Page from "./components/common/Page";
import { checkIsLoggedIn } from "./auth/auth";
import { useEffect } from "react";
import { User } from "firebase/auth";

export default function App() {
  const [user, setUser] = useState<User>();
  const [loggedIn, setLoggedIn] = useState(false);

  function checkUserLoggedIn(user: any) {
    if (user) {
      setUser(user);
      setLoggedIn(true);
    } else {
      setUser(user);
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    checkIsLoggedIn(checkUserLoggedIn);
  }, [loggedIn]);

  return (
    <ChakraProvider>
      <Page user={user as User} setLoggedIn={setLoggedIn}>
        {loggedIn ? <Home /> : <Login setLoggedIn={setLoggedIn} />}
      </Page>
    </ChakraProvider>
  );
}
