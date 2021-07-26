import React, { useState } from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const NavItem = ({ icon, children, route, hasSub, ...rest }) => {
  return (
    <React.Fragment>
      {!hasSub ? (
        <NavLink
          to={route}
          activeStyle={{
            color: "purple",
            fontWeight: "bold",
          }}
        >
          <Flex
            align="center"
            p="3"
            mt="5"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "purple.500",
              color: "white",
            }}
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </NavLink>
      ) : (
        <Flex
          align="center"
          p="3"
          mt="5"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          {...rest}
        >
          {icon && <Icon mr="4" fontSize="16" as={icon} />}
          {children}
        </Flex>
      )}
    </React.Fragment>
  );
};

export default NavItem;
