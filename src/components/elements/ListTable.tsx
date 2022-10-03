import {
  Center,
  Spinner,
  Table,
  TableContainer,
  Tbody,
} from "@chakra-ui/react";
import React from "react";
import ListItem from "./ListItem";

interface TableListProps {
  items: string[];
  loading: boolean;
}

function ListTable({ items, loading }: TableListProps) {
  return (
    <TableContainer w={["sm", "md", "xl", "2xl"]}>
      <Table variant="striped" color="#319795">
        <Tbody>
          {loading ? (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="teal.500"
                size="xl"
              />
            </Center>
          ) : (
            items.map((text) => <ListItem key={text} text={text} />)
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListTable;
