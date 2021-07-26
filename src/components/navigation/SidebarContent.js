import React from "react";
import { Box, CloseButton, Flex, useColorModeValue } from "@chakra-ui/react";
import NavItem from "./NavItem";
import SubNavItem from "./SubNavItem";
import { BrowserRouter as Router } from "react-router-dom";
import { FaDashcube } from "react-icons/fa";
import LogoutItem from "./LogoutItem";
import { FiLogOut } from "react-icons/fi";
const SidebarContent = ({ onClose, sidebarstuff, ...rest }) => {
  const genereteSubLinks = (subroute, mainroute) => {
    return subroute.map((sub) => {
      return (
        <SubNavItem icon={FaDashcube} route={mainroute + sub.route}>
          {sub.title}
        </SubNavItem>
      );
    });
  };
  return (
    <Box
      //   transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        mb="20"
        justifyContent="space-between"
      >
        {/* <Image
          src="https://pms.lk/public/img/business/logo/logo.png"
          objectFit="cover"
          alt="pms logo"
        /> */}

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {sidebarstuff.map((navitem) => {
        return (
          <React.Fragment>
            <NavItem
              route={navitem.route}
              icon={navitem.icon}
              hasSub={navitem.subroutes.length > 0}
            >
              {navitem.title}
            </NavItem>
            {navitem.subroutes.length > 0
              ? genereteSubLinks(navitem.subroutes, navitem.route)
              : null}
          </React.Fragment>
        );
      })}
      <LogoutItem route="/logout" icon={FiLogOut}>
        Logout
      </LogoutItem>
    </Box>
  );
};

export default SidebarContent;
