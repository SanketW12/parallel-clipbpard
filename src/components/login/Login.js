import {
  Box,
  Button,
  Center,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  Text,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Lock, User } from "react-feather";
import { signIn } from "../../auth/auth";

function Login({ setLoggedIn }) {
  const [flag, setFlag] = useBoolean();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();

  const handleSignIn = () => {
    setLoading(true);
    if (user?.email && user?.password) {
      signIn(user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);
          setLoggedIn(true);
          toast({
            title: "Logged In!",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          const errorCode = error.code;
          toast({
            title: errorCode,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setLoading(false);
        });
    }
  };

  return (
    <Box w={["sm", "md"]} p={5} mt={5} borderWidth="1px" borderRadius={5}>
      <Stack spacing={7}>
        <Text
          color="teal.700"
          textAlign="center"
          fontWeight="semibold"
          fontSize="xl"
        >
          Welcome
        </Text>

        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<User color="teal" />}
            />

            <Input
              required
              value={user?.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              focusBorderColor="teal.500"
              type="email"
              placeholder="email address"
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              children={<Lock color="teal" />}
            />
            <Input
              required
              value={user?.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              focusBorderColor="teal.500"
              type={flag ? "text" : "password"}
              placeholder="Password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={setFlag.toggle}>
                {flag ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          <FormHelperText textAlign="right">
            <Link color="teal.500">forgot password?</Link>
          </FormHelperText>
        </FormControl>
        <Button isLoading={loading} onClick={handleSignIn} colorScheme="teal">
          Login
        </Button>

        <Center>
          {`New to us?`}
          <Link color="teal.500" href="#">
            Sign Up
          </Link>
        </Center>
      </Stack>
    </Box>
  );
}

export default Login;
