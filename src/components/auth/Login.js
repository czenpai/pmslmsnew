import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../Header";
import { FcGoogle } from "react-icons/fc";
import { signin, authenticate, isAuth } from "../../actions/auth";
import { Route, Redirect } from "react-router-dom";
import AdminPanel from "../../roles/admin/AdminPanel";
import StudentPanel from "../../roles/student/StudentPanel";
import TrainerPanel from "../../roles/trainer/TrainerPanel";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
function Login(props) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
  });
  const { email, password, error, loading, message } = values;
  const authCtx = useContext(AuthContext);
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const onLogin = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    signin(user).then((data) => {
      console.log(data);
      if (data?.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          authCtx.login(isAuth());
        });
      }
    });
  };

  return (
    <React.Fragment>
      <HStack
        pl={2}
        pr={2}
        pt={3}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Header />
      </HStack>
      <Flex
        pt={5}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login to LMS portal</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Learning <Link color={"purple.500"}>Maximized</Link> ✌️
          </Text>
        </Stack>
      </Flex>
      <Flex
        minH={"75vh"}
        align={"center"}
        justify={"center"}
        textAlign={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        direction="row"
      >
        <SimpleGrid columns={{ md: 3 }} spacingY={6}>
          <Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input onChange={handleChange("email")} type="email" />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input onChange={handleChange("password")} type="password" />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={"purple.500"}>Forgot password?</Link>
                  </Stack>
                  <Button
                    onClick={onLogin}
                    bg={"purple.500"}
                    color={"white"}
                    _hover={{
                      bg: "purple.400",
                    }}
                  >
                    Log in
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Flex align={"center"} justify={"center"}>
            <Text fontSize={"2xl"} color={"gray.600"}>
              OR
            </Text>
          </Flex>
          <Stack>
            <Center p={8}>
              <Button
                w={"full"}
                maxW={"md"}
                variant={"outline"}
                leftIcon={<FcGoogle />}
              >
                <Center>
                  <Text>Log in with Google</Text>
                </Center>
              </Button>
            </Center>
          </Stack>
        </SimpleGrid>
      </Flex>
    </React.Fragment>
  );
}

export default Login;
