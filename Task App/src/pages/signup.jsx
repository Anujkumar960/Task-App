import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Checkbox,
  } from "@chakra-ui/react";
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import axios from "axios";
  import { Link } from "react-router-dom";
  
  const initData = {
    _id: "",
    username: "",
    email: "",
    password: "",
    roles: [],
    image: null,
  };
  
  export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState(initData);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
    };
  
    const handleRoleChange = (e) => {
      const { name, checked } = e.target;
      if (checked) {
        setUserData({ ...userData, roles: [...userData.roles, name] });
      } else {
        setUserData({
          ...userData,
          roles: userData.roles.filter((role) => role !== name),
        });
      }
    };
  
    const handleSubmit = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5500/user/register",
          userData
        );

        console.log(res);
       // setUserData(initData);
      } catch (error) {
        console.log(error);
      }
    console.log(userData);
    };
  
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Box
          maxW={"lg"}
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          rounded={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Heading textAlign={"center"}>Sign up</Heading>
            <Text textAlign={"center"} color={"gray.600"}>
              Create an account to access all features
            </Text>
            <FormControl isRequired>
              <FormLabel>User Name</FormLabel>
              <Input name="username" onChange={handleChange} type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>userID</FormLabel>
              <Input name="_id" onChange={handleChange} type="number" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input name="email" onChange={handleChange} type="email" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>image</FormLabel>
              <Input name="image" onChange={handleChange} type="text" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl >
              <FormLabel>Roles</FormLabel>
              <HStack spacing={4}>
                <Checkbox name="admin" onChange={handleRoleChange}>
                  Admin
                </Checkbox>
                <Checkbox name="user" onChange={handleRoleChange}>
                  User
                </Checkbox>
              </HStack>
            </FormControl>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
            <Text textAlign={"center"}>
              Already have an account?{" "}
              <Link to={"/"} >
                <Text color={"blue.400"}>Login</Text>
              </Link>
            </Text>
          </Stack>
        </Box>
      </Flex>
    );
  }
  