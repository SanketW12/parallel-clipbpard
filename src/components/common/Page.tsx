import { Box, Center } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";

interface PageProps {
  user: User;
  setLoggedIn: (state: boolean) => void;
  children: React.ReactNode;
}

function Page({ user, setLoggedIn, children }: PageProps) {
  return (
    <Box>
      <Helmet>
        <title>Parallel Clipboard</title>
      </Helmet>
      <Header user={user} setLoggedIn={setLoggedIn} />
      <Box px="2" py="4">
        <Center display="flex" justifyContent="center">
          {children}
        </Center>
      </Box>
    </Box>
  );
}

export default Page;
