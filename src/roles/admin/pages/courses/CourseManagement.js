import {
  Input,
  VStack,
  Flex,
  Text,
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
  Select,
  Textarea,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

import UserSearch from "../../../../components/search/UserSearch";

import { useContext } from "react";
import AuthContext from "../../../../store/auth-context";

import { getCookie } from "../../../../actions/auth";
import { listCourseCards } from "../../../../actions/course";
import CourseCard from "../../../../components/card/CourseCard";

function CourseManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [courses, setCourses] = useState([]);
  const [coursesSearch, setCoursesSearch] = useState([]);
  // const [makeClassroom, setMakeClassRoom] = useState(true);
  // const [makeEvent, setMakeEvent] = useState(true);

  const courseRef = React.createRef();
  const token = getCookie("token");
  const [isSearching, setIsSearching] = useState(false);

  const [values, setValues] = useState({
    error: "",
    success: "",
    formData: "",
    course: "",
    startdate: "",
    batchname: "",
    displayweb: false,
    lockSubmit: false,
  });
  const {
    error,
    formData,
    startdate,
    batchname,
    displayweb,
    classroom,
    calender,
    courseId,
    lockSubmit,
  } = values;
  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    getCourses();
  }, []);

  const handleChange = (name) => (e) => {
    console.log(name);
    const value = e.target.value;

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
      courses.forEach((user) => {
        if (user.name.includes(enteredUser)) {
          temp.push(user);
        }
      });

      console.log(temp);
      setCoursesSearch(temp);
      setIsSearching(true);
    }
  };

  const searchCards = () => {
    return coursesSearch.map((user) => {
      return (
        <GridItem colSpan={2}>
          <CourseCard course={user} />
        </GridItem>
      );
    });
  };
  const userCards = () => {
    return courses.map((user) => {
      return (
        <GridItem colSpan={2}>
          <CourseCard course={user} />
        </GridItem>
      );
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, lockSubmit: true });
    // if (isAutoPass) {
    //   generateBatchName();
    // }

    // createBatch(formData, token, authCtx.user).then((data) => {
    //   if (data?.error) {
    //     console.log(data.error);
    //     setValues({ ...values, lockSubmit: false });
    //   } else {
    //     setValues({
    //       ...values,
    //       error: "",
    //       success: `A new user was created`,
    //       formData: "",
    //       courseId: "",
    //       startdate: "",
    //       batchname: "",
    //       event: "",
    //       classroom: true,
    //       calender: true,
    //       displayweb: false,
    //       lockSubmit: false,
    //     });
    //   }
    // });
  };

  const getCourses = () => {
    listCourseCards().then((courses) => {
      setCourses(courses);
    });
  };

  const generateCourseList = () => {
    return courses.map((course) => {
      return <option value={course._id}>{course.title}</option>;
    });
  };

  return (
    <VStack>
      <Drawer
        isOpen={isOpen}
        placement="right"
        size={"full"}
        initialFocusRef={courseRef}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent alignItems="center">
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new course
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px" w="800px" justifyContent="center">
              <Box>
                <FormLabel htmlFor="title">Course Title</FormLabel>
                <Input
                  ref={courseRef}
                  onChange={handleChange("title")}
                  id="title"
                  placeholder="Course Title"
                />
              </Box>

              <Box>
                <Select
                  variant="filled"
                  onChange={handleChange("course")}
                  placeholder="Select Course Type"
                >
                  <option>Agile</option>
                  <option>Project Management</option>
                  <option>Business Analysis</option>
                  <option>Soft Skills</option>
                  <option>Information Technology</option>
                  <option>Community Projects</option>
                </Select>
              </Box>
              <Box>
                <FormLabel htmlFor="introduction">Introduction</FormLabel>
                <Textarea
                  onChange={handleChange("introduction")}
                  id="introduction"
                  placeholder="Course Introduction here"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="duration">Duration</FormLabel>
                <Input
                  onChange={handleChange("duration")}
                  id="duration"
                  placeholder="Course Duration"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="courseFee">Course Fee</FormLabel>
                <Input
                  onChange={handleChange("courseFee")}
                  id="courseFee"
                  placeholder="Course Fee"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="courseImage">Course Image URL</FormLabel>
                <Input
                  onChange={handleChange("courseImage")}
                  id="courseImage"
                  placeholder="Course Image"
                />
              </Box>
              <Box>
                <FormLabel htmlFor="certificateUrl">
                  Course Certificate Image URL
                </FormLabel>
                <Input
                  onChange={handleChange("certificateUrl")}
                  id="certificateUrl"
                  placeholder="Course Certificate Url"
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
              {!false ? "Create Course" : "Please Wait"}
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
}

export default CourseManagement;
