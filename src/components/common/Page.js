import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";

function Page({ user, setLoggedIn, children }) {
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
