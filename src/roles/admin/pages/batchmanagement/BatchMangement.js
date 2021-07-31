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
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import {
  createBatch,
  createCalender,
  getBatches,
} from "../../../../actions/batch";
import UserSearch from "../../../../components/search/UserSearch";

import { useContext } from "react";
import AuthContext from "../../../../store/auth-context";
import UserCard from "../../../../components/card/UserCard";
import { getCookie } from "../../../../actions/auth";
import { listCourseCards } from "../../../../actions/course";

const BatchManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [batches, setBatches] = useState([]);
  const [batchesSearch, setBatchesSearch] = useState([]);
  const [courses, setCourse] = useState([]);
  const [makeClassroom, setMakeClassRoom] = useState(true);
  const [makeEvent, setMakeEvent] = useState(true);

  const courseRef = React.createRef();
  const token = getCookie("token");
  const [isAutoPass, setIsAutoPass] = useState(true);
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
    getAllBatches().then(() => getCourses());
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
      batches.forEach((user) => {
        if (user.name.includes(enteredUser)) {
          temp.push(user);
        }
      });

      console.log(temp);
      setBatchesSearch(temp);
      setIsSearching(true);
    }
  };

  const getAllBatches = async () => {
    await getBatches(authCtx.user).then((data) => {
      setBatches(data);
    });
  };
  const searchCards = () => {
    return batchesSearch.map((user) => {
      return (
        <GridItem colSpan={2}>
          <UserCard user={user} />
        </GridItem>
      );
    });
  };
  const userCards = () => {
    return batches.map((user) => {
      return (
        <GridItem colSpan={2}>
          <UserCard user={user} />
        </GridItem>
      );
    });
  };
  const generateBatchName = () => {
    const tempCourse = courses.find((cou) => cou._id == courseId);

    console.log(tempCourse.shortName);
    const strDate = new Date(startdate).toDateString();
    const batchName = `${tempCourse.shortName} ${strDate}`;
    console.log(batchName);
    formData.set("batchname", batchName);

    setValues({ ...values, formData: formData, batchname: batchName });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, lockSubmit: true });
    // if (isAutoPass) {
    //   generateBatchName();
    // }
    createCalenderEvent();
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

  const createClassroom = () => {};

  const createCalenderEvent = async () => {
    const event = {
      summary: batchname,
      location: "",
      description: "",
      start: {
        dateTime: "2015-05-28T09:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2015-05-28T17:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
      attendees: [{ email: "dinuga@gmail.com" }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
    };
    await createCalender(event, authCtx.googleToken).then((data) => {
      console.log(data?.message);
    });
  };

  const getCourses = () => {
    listCourseCards().then((courses) => {
      setCourse(courses);
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
        size={"md"}
        initialFocusRef={courseRef}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new batch
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <Select
                  ref={courseRef}
                  variant="filled"
                  onChange={handleChange("course")}
                  placeholder="Select Course"
                >
                  {generateCourseList()}
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="startdate">Event Start Date</FormLabel>
                <Input
                  onChange={handleChange("startdate")}
                  id="startdate"
                  type="date"
                  placeholder="Please enter start date"
                />
              </Box>
              <Box>
                <HStack align="center">
                  <Box>
                    <FormLabel htmlFor="batchname">Batch Name</FormLabel>
                    <Input
                      onChange={handleChange("batchname")}
                      value={batchname != "" ? batchname : ""}
                      isDisabled={isAutoPass}
                      id="batchname"
                      placeholder="Please enter batch name"
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

              {/* <Box>
                <FormLabel htmlFor="company">Company Name</FormLabel>
                <Input
                  onChange={handleChange("company")}
                  id="company"
                  placeholder="Please enter company name"
                />
              </Box> */}

              <Box>
                <FormLabel htmlFor="desc">Extra Details</FormLabel>
                <Textarea
                  onChange={handleChange("extra")}
                  id="desc"
                  placeholder="Other dates and course information can be entered here"
                />
              </Box>
              <Box>
                <Checkbox
                  isChecked={makeClassroom}
                  onChange={(value) => {
                    setMakeClassRoom(!makeClassroom);
                  }}
                  colorScheme="purple"
                >
                  Google Classroom
                </Checkbox>
              </Box>
              <Box>
                <Checkbox
                  isChecked={makeEvent}
                  onChange={() => {
                    setMakeEvent(!makeEvent);
                  }}
                  colorScheme="purple"
                >
                  Create Google Calender
                </Checkbox>
              </Box>
              <Box>
                <Checkbox colorScheme="red">
                  display in pms.lk website schedule
                </Checkbox>
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
              {!false ? "Create Batch" : "Please Wait"}
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

export default BatchManagement;
