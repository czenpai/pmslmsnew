import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const SubNavItem = ({ icon, children, route, ...rest }) => {
  return (
    <React.Fragment>
      <NavLink
        to={route}
        activeStyle={{
          color: "purple",
          fontWeight: "bold",
        }}
        style={{ textDecoration: "none" }}
      >
        <Flex
          align="center"
          p="3"
          ml="12"
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
    </React.Fragment>
  );
};

export default SubNavItem;
