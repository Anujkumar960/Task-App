import { useState } from "react";
// import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5500/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });


      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Save token to localStorage
        // Redirect user based on roles
        console.log(data.token);
        if (data.roles.includes("admin")) {
          // history.push("/admin");
          navigate("/admin");
        }else{
            navigate("/user")
        }
      } else {
        // Handle login failure
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <Box
      p={4}
      maxW="400px"
      mx="auto"
      transform={"translate(0%,50%)"}
      mb={"100px"}
    >
      <Heading textAlign={"center"} mb={"20px"}>
        LOGIN
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel display={"flex"} alignItems={"center"}>
            <FaEnvelope style={{ marginRight: "0.5rem" }} />
            Email
          </FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel display={"flex"} alignItems={"center"}>
            <FaLock style={{ marginRight: "0.5rem" }} />
            Password
          </FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleLogin}>
          Login
        </Button>
      </VStack>
      <Stack pt={6}>
        <Text align={"center"}>
          Not have account ?{" "}
          <Link to={"/signup"}>
            <Text color={"blue.400"}>Sign up here</Text>
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};


export default LoginPage;


