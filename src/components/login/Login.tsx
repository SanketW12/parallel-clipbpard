import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
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
import React, { useState } from "react";
import { Lock, User } from "react-feather";
import { QRCode } from "react-scanned-qr";
import { signIn, signUp } from "../../auth/auth";

interface ScanProps {
  id: string;
  value: string;
}

interface UserCredential {
  email: string;
  password: string;
}

interface LoginPageProps {
  setLoggedIn: (state: boolean) => void;
}

function Login({ setLoggedIn }: LoginPageProps) {
  const [flag, setFlag] = useBoolean();
  const [user, setUser] = useState<UserCredential>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const toast = useToast();

  function handleSignInfn(user: UserCredential) {
    signIn(user.email, user.password)
      .then((userCredential) => {
        // const user = userCredential.user;

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

  const handleSignIn = () => {
    if (user?.email && user?.password) {
      setError("");
      setLoading(true);
      handleSignInfn(user);
    } else {
      setError("*Please enter credentials");
    }
  };

  function handleSignUp() {
    if (user?.email && user?.password) {
      setError("");
      setLoading(true);
      signUp(user.email, user.password)
        .then((userCredential) => {
          // Signed in
          console.log(userCredential, "Signed in");
          // const user = userCredential.user;
          setLoggedIn(true);
          toast({
            title: "Account created!",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          setLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(error);

          toast({
            title: errorCode,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
          setLoading(false);
        });
    } else {
      setError("*Please enter details");
    }
  }

  function handleScanned(data: ScanProps) {
    setTimeout(
      () => handleSignInfn({ email: `${data.id}@mail.com`, password: data.id }),
      1000
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      flexWrap="wrap"
      w={["sm", "sm", "2xl"]}
      p={5}
      mt={5}
      borderWidth="1px"
      borderRadius={5}
    >
      <Stack spacing={6}>
        <Text
          color="teal.700"
          textAlign="center"
          fontWeight="semibold"
          fontSize="xl"
        >
          {showSignUp ? "Create an account" : "Welcome"}
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
              onChange={(e) =>
                setUser({ ...user, email: e.target.value } as UserCredential)
              }
              isDisabled={loading}
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
              onChange={(e) =>
                setUser({ ...user, password: e.target.value } as UserCredential)
              }
              isDisabled={loading}
              focusBorderColor="teal.500"
              type={flag ? "text" : "password"}
              placeholder="Password"
            />
            <InputRightElement width="4.5rem">
              <Button
                isDisabled={loading}
                h="1.75rem"
                size="sm"
                onClick={setFlag.toggle}
              >
                {flag ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>

          {!showSignUp && (
            <FormHelperText textAlign="right">
              <Link color="teal.500">forgot password?</Link>
            </FormHelperText>
          )}
          <FormHelperText color="red">{error}</FormHelperText>
        </FormControl>
        <Button
          isLoading={loading}
          onClick={showSignUp ? handleSignUp : handleSignIn}
          colorScheme="teal"
        >
          {showSignUp ? "Sign Up" : "Login"}
        </Button>

        <Center>
          {showSignUp ? `Already a user? ` : `New to us? `}
          <Link onClick={() => setShowSignUp(!showSignUp)} color="teal.500">
            {showSignUp ? " Log In" : "Sign Up"}
          </Link>
        </Center>
      </Stack>

      <Stack spacing={3}>
        <Flex align="center">
          <Divider />

          <Text
            flexGrow="2"
            color="teal.700"
            textAlign="center"
            fontWeight="semibold"
            fontSize="md"
          >
            ORScan
          </Text>

          <Divider />
        </Flex>
        <QRCode
          bgColor="#fcfcfc"
          fgColor="teal"
          onScanned={(data: any) => {
            setLoading(true);
            handleScanned(data);
          }}
          onError={() => {}}
          value="sanket"
        />
      </Stack>
    </Box>
  );
}

export default Login;
