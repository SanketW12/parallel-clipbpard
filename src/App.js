import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/login/Login";
import { useState } from "react";
import Home from "./pages/Home";
import { auth } from "./firebase";
import Page from "./components/common/Page";
import { checkIsLoggedIn } from "./auth/auth";
import { useEffect } from "react";

export default function App() {
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  function checkUserLoggedIn(user) {
    if (user) {
      setUser(user);
      setLoggedIn(true);
    } else {
      setUser();
      setLoggedIn(false);
    }
  }

  useEffect(() => {
    checkIsLoggedIn(checkUserLoggedIn);
  }, [loggedIn]);

  return (
    <ChakraProvider>
      <Page user={user} setLoggedIn={setLoggedIn}>
        {loggedIn ? (
          <Home />
        ) : (
          <Login
            user={user}
            setUser={setUser}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        )}
      </Page>
    </ChakraProvider>
  );
}
