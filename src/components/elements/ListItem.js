import { Box, Td, Tr } from "@chakra-ui/react";
import React from "react";
import CopyButton from "./CopyButton";

function ListItem({ text }) {
  return (
    <Tr >
      <Td>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {text}
          <CopyButton text={text} />
        </Box>
      </Td>
    </Tr>
  );
}

export default ListItem;
