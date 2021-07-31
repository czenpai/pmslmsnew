import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  Image,
  AvatarGroup,
  useBreakpointValue,
  Link,
  Icon,
  FormControl,
  FormLabel,
  Checkbox,
  Center,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { authenticate, isAuth, signin } from "../../actions/auth";
import AuthContext from "../../store/auth-context";
import LoginGoogle from "./LoginGoogle";
export default function LoginBeauty() {
  const [values, setValues] = useState({
    email: "dinuga@gmail.com",
    password: "rrrrrr",
    error: "",
    loading: false,
    message: "",
  });
  const { email, password, error, loading, message } = values;
  const authCtx = useContext(AuthContext);
  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  const onLogin = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };
    signin(user).then((data) => {
      console.log(data);
      if (data?.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        console.log(data);
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          authCtx.login(isAuth());
        });
      }
    });
  };
  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const avatarVariant = useBreakpointValue({ base: "md", md: "lg" });
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            Become a
            <Text
              as={"span"}
              bgGradient="linear(to-r, purple.400,pink.400)"
              bgClip="text"
            >
              {" "}
              certifed{" "}
            </Text>
            professional
          </Heading>
          <Stack direction={"row"} spacing={4} align={"center"}>
            <Image
              borderRadius="10px"
              src={
                "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              }
            />
          </Stack>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Heading
            color={"gray.800"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            Login to LMS
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
          <Box as={"form"} mt={10}>
            <Stack spacing={4} mt="10">
              <FormControl id="email">
                <FormLabel
                  color={"gray.800"}
                  lineHeight={1.1}
                  fontSize={{ base: "md", sm: "md", md: "xl" }}
                >
                  Email address
                </FormLabel>
                <Input
                  placeholder="user@gmail.com"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  onChange={handleChange("email")}
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel
                  color={"gray.800"}
                  lineHeight={1.1}
                  fontSize={{ base: "md", sm: "md", md: "xl" }}
                >
                  Password
                </FormLabel>
                <Input
                  bg={"gray.100"}
                  placeholder="password"
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  onChange={handleChange("password")}
                  type="password"
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"purple.500"}>Forgot password?</Link>
                </Stack>
                <Button
                  onClick={onLogin}
                  bg={"purple.500"}
                  lineHeight={1.1}
                  fontSize={{ base: "md", sm: "md", md: "xl" }}
                  color={"white"}
                  _hover={{
                    bg: "purple.400",
                  }}
                >
                  Log in
                </Button>

                {/* <Button
                  w={"full"}
                  variant={"outline"}
                  bg="gray.200"
                  _hover={{ bg: "gray.100" }}
                  leftIcon={<FcGoogle />}
                >
                  <Center>
                    <Text
                      color={"gray.800"}
                      lineHeight={1.1}
                      fontSize={{ base: "md", sm: "md", md: "xl" }}
                    >
                      Log in with Google
                    </Text>
                  </Center>
                </Button> */}
                <LoginGoogle />
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
