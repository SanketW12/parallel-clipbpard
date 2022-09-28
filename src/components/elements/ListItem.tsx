import { Box, Td, Th, Tr } from "@chakra-ui/react";
import React from "react";
import CopyButton from "./CopyButton";

interface ListItemProps {
  text: string;
}

function ListItem({ text }: ListItemProps) {
  return (
    <Tr>
      <Td
        maxW={["240px", "300px", "400px", "500px"]}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        <Box>{text}</Box>
      </Td>
      <Td>
        <CopyButton text={text} />
      </Td>
    </Tr>
  );
}

export default ListItem;
