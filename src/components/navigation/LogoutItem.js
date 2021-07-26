import React, { useContext } from "react";
import { Center, Flex, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Link,
} from "@chakra-ui/react";
import AuthContext from "../../store/auth-context";
const LogoutItem = ({ icon, children, route, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const authCtx = useContext(AuthContext);
  const logout = async () => {
    authCtx.logout();
  };
  return (
    <React.Fragment>
      <Link onClick={onOpen} style={{ textDecoration: "none" }}>
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
      </Link>

      <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to logout?</ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={logout}>
              Yes
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default LogoutItem;
