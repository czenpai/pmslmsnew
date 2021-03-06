import {
  Input,
  InputGroup,
  VStack,
  InputLeftElement,
  Flex,
  Text,
  SimpleGrid,
  Box,
  Button,
  Stack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  FormLabel,
  InputRightAddon,
  InputLeftAddon,
  Select,
  Textarea,
  HStack,
  Radio,
  RadioGroup,
  Spacer,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { createUser, getUsers } from "../../../../actions/user";
import UserSearch from "../../../../components/search/UserSearch";

import { useContext } from "react";
import AuthContext from "../../../../store/auth-context";
import UserCard from "../../../../components/card/UserCard";
import { getCookie } from "../../../../actions/auth";

const StudentManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [usersSearch, setUsersSearch] = useState([]);

  const nameRef = React.createRef();
  const token = getCookie("token");
  const [isAutoPass, setIsAutoPass] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const [values, setValues] = useState({
    error: "",
    success: "",
    name: "",
    formData: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    extra: "",
    lockSubmit: false,
  });
  const {
    error,
    success,
    formData,
    role,
    phone,
    password,
    email,
    extra,
    company,
    lockSubmit,
  } = values;
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });

    getAllUsers();
  }, []);

  const handleChange = (name) => (e) => {
    console.log(name);
    const value =
      name == "password"
        ? isAutoPass
          ? generatePass()
          : e.target.value
        : e.target.value;

    formData.set(name, value);

    setValues({
      ...values,
      [name]: value,
      formData: formData,
      error: "",
      success: "",
    });
  };

  const authCtx = useContext(AuthContext);

  const searchStudent = (e) => {
    const enteredUser = e.target.value;
    if (enteredUser.length == 0) {
      setIsSearching(false);
    } else {
      let temp = [];
      users.forEach((user) => {
        if (user.name.includes(enteredUser)) {
          temp.push(user);
        }
      });

      console.log(temp);
      setUsersSearch(temp);
      setIsSearching(true);
    }
  };

  const getAllUsers = async () => {
    await getUsers(authCtx.user).then((data) => {
      setUsers(data);
    });
  };
  const searchCards = () => {
    return usersSearch.map((user) => {
      return (
        <GridItem colSpan={2}>
          <UserCard user={user} />
        </GridItem>
      );
    });
  };
  const userCards = () => {
    return users.map((user) => {
      return (
        <GridItem colSpan={2}>
          <UserCard user={user} />
        </GridItem>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, lockSubmit: true });
    if (isAutoPass) {
      formData.set("password", generatePass());
      setValues({
        ...values,
        formData: formData,
      });
    }
    createUser(formData, token, authCtx.user).then((data) => {
      if (data?.error) {
        console.log(data.error);
        setValues({ ...values, lockSubmit: true });
      } else {
        setValues({
          ...values,
          error: "",
          success: `A new user was created`,
          formData: "",
          email: "",
          password: "",
          phone: "",
          comapany: "",
          role: "",
          extra: "",
          lockSubmit: false,
        });
      }
    });
  };

  const generatePass = () => {
    var length = 8,
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    console.log(retVal);
    return retVal;
  };
  return (
    <VStack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={"md"}
        initialFocusRef={nameRef}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="fullname">Full Name</FormLabel>
                <Input
                  onChange={handleChange("name")}
                  ref={nameRef}
                  id="fullname"
                  placeholder="Please enter full name"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  onChange={handleChange("email")}
                  id="email"
                  placeholder="Please enter email"
                />
              </Box>
              <Box>
                <HStack align="center">
                  <Box>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                      onChange={handleChange("password")}
                      id="password"
                      type="password"
                      disabled={isAutoPass}
                      placeholder="Password"
                    />
                  </Box>
                  <Spacer />
                  <Box flex="4">
                    <RadioGroup
                      onChange={(value) => {
                        console.log(value);
                        const val = value == "1" ? true : false;
                        setIsAutoPass(val);
                      }}
                      value={isAutoPass ? "1" : "2"}
                      defaultValue={isAutoPass ? "1" : "2"}
                    >
                      <Stack spacing={5} direction="row">
                        <Radio colorScheme="green" value="1">
                          Auto
                        </Radio>
                        <Radio colorScheme="green" value="2">
                          Create
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </Box>
                </HStack>
              </Box>

              <Box>
                <FormLabel htmlFor="company">Company Name</FormLabel>
                <Input
                  onChange={handleChange("company")}
                  id="company"
                  placeholder="Please enter company name"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="phone">Phone Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="+94" />
                  <Input
                    type="tel"
                    placeholder="phone number"
                    onChange={handleChange("phone")}
                  />
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Select Role</FormLabel>
                <Select
                  id="owner"
                  onChange={handleChange("role")}
                  defaultValue={role}
                >
                  <option value={0}>Student</option>
                  <option value={2}>Trainer</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Extra Details</FormLabel>
                <Textarea
                  onChange={handleChange("extra")}
                  id="desc"
                  placeholder="Extra phone numbers, emails, addresses ect.. can be entered here"
                />
              </Box>
              <Text color={"red.500"}>{error}</Text>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              // isDisabled={lockSubmit}
              onClick={handleSubmit}
              colorScheme="blue"
            >
              {!false ? "Create User" : "Please Wait"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Flex w="100%" justify="center">
        <Box>
          <UserSearch onEnter={searchStudent} />
        </Box>
      </Flex>
      <Flex w="90%">
        <Grid w="100%" templateColumns="repeat(6, 1fr)" gap={10}>
          {!isSearching ? userCards() : searchCards()}
        </Grid>
      </Flex>

      <IconButton
        isRound={true}
        p="5"
        borderRadius="10"
        icon={<FaPlus />}
        color="white"
        bg="purple.400"
        _hover={{ bg: "purple.300" }}
        style={{ position: "fixed", bottom: "50px", right: "40px" }}
        onClick={onOpen}
      />
    </VStack>
  );
};

export default StudentManagement;
