import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { logOut } from "../../auth/auth";

const Header = ({ user, setLoggedIn }) => {
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const toast = useToast();

  function handleLogout() {
    logOut()
      .then(() => {
        onClose();
        toast({
          title: "Logged out!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setLoggedIn(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        toast({
          title: errorCode,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="teal.500"
      color="white"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      <Flex align="center" mr={5}>
        <Box display="flex">
          <Heading as="h6" size="lg">
            Parallel Clipboard
          </Heading>
        </Box>
      </Flex>
      <Box display={{ base: "block", md: "none" }}>
        <Button
          style={{ background: "#2C7A7B" }}
          colorScheme="teal"
          variant="solid"
          ref={btnRef}
          onClick={handleToggle}
        >
          <HamburgerIcon boxSize={6} />
        </Button>
      </Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      ></Stack>
      <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {user && (
          <Button
            _hover={{ bg: "teal.400" }}
            colorScheme="white"
            variant="outline"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
