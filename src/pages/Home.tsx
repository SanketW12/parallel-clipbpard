import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Check } from "react-feather";

import ListTable from "../components/elements/ListTable";
import { auth, db } from "../firebase";

function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const addData = () => {
    setDoc(doc(db, "texts", auth?.currentUser?.uid as string), {
      clipboardTexts: [newItem, ...items],
    }).then(() => {
      setNewItem("");
      toast({
        title: "Data Added!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      getData();
    });
  };

  const getData = async () => {
    const { currentUser } = auth;
    setLoading(true);
    if (currentUser) {
      const docRef = await doc(db, "texts", auth?.currentUser?.uid as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setItems(docSnap.data().clipboardTexts);
        setLoading(false);
      } else {
        // doc.data() will be undefined in this case
        setLoading(false);
      }
    } else setTimeout(getData, 200);
  };

  useEffect(() => {
    getData();
  }, [auth]);

  return (
    <Box>
      <Stack spacing={3}>
        <Text
          color="teal.700"
          textAlign="center"
          fontWeight="semibold"
          fontSize="xl"
        >
          Clipboard Text
        </Text>
        <InputGroup size="lg">
          <Input
            required
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            focusBorderColor="teal.500"
            pr="4.5rem"
            placeholder="Enter text.."
          />
          <InputRightElement width="4.5rem">
            <Button
              // color={"teal"}
              h="2rem"
              size="sm"
              colorScheme="teal"
              variant="solid"
              disabled={newItem ? false : true}
              onClick={addData}
            >
              <Check />
            </Button>
          </InputRightElement>
        </InputGroup>
        <ListTable items={items} loading={loading} />
      </Stack>
    </Box>
  );
}

export default Home;
