import { Button, useClipboard, useToast } from "@chakra-ui/react";
import React from "react";

interface CopyButtonProps {
  text: string;
}

function CopyButton({ text }: CopyButtonProps) {
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(text);
  return (
    <Button
      colorScheme="teal"
      variant="outline"
      onClick={() => {
        onCopy();
        toast({
          title: "Text Copied!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }}
    >
      {hasCopied ? "Copied" : "Copy"}
    </Button>
  );
}

export default CopyButton;
