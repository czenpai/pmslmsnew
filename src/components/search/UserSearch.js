import {
  Input,
  InputGroup,
  VStack,
  InputLeftElement,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { FaSearch } from "react-icons/fa";

function UserSearch({ onEnter }) {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<FaSearch color="purple" />}
      />
      <Input
        onChange={onEnter}
        focusBorderColor="purple.400"
        placeholder="Search for user"
      />
    </InputGroup>
  );
}

export default UserSearch;
