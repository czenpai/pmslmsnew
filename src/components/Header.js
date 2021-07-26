import React from "react";
import {
  Stack,
  Image,
  HStack,
  VStack,
  Box,
  IconButton,
  useColorMode,
  Spacer,
  Flex,
} from "@chakra-ui/react";
import { Heading } from "@chakra-ui/layout";
import {
  FaSun,
  FaMoon,
  FaGithub,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <React.Fragment>
      <Image
        width="10%"
        src="https://pms.lk/public/img/business/logo/logo.png"
        objectFit="cover"
        alt="pms logo"
      />
      <Spacer />
      <IconButton ml="2" icon={<FaFacebook />} isRound="true"></IconButton>
      <IconButton ml="2" icon={<FaInstagram />} isRound="true"></IconButton>
      <IconButton ml="2" icon={<FaGithub />} isRound="true"></IconButton>
      <IconButton
        ml="8"
        icon={isDark ? <FaSun /> : <FaMoon />}
        isRound="true"
        onClick={toggleColorMode}
      ></IconButton>
    </React.Fragment>
  );
}

export default Header;
