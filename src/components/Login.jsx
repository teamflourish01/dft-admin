import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; // Import icons from Chakra UI

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const url = process.env.REACT_APP_DEV_URL;
  const Navigate = useNavigate();

  const handleInput = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/user/signin`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);
        

        toast({
          title: "Login Success",
          description: "You have successfully logged in.",
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        Navigate("/admin/");
        
      } else {
        const errorData = await response.json();
        toast({
          title: "Login Failed",
          description: errorData.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: "Unable to login.",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <Center
      minH="100vh"
      bg="#f7f7f7" // grayish-blue background color
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <Container maxW="lg" centerContent>
        <Flex
          w="100%"
          borderWidth={1}
          borderRadius="lg"
          boxShadow="0 4px 12px rgba(135, 235, 235, 0.8)" // shadow
          bg="white"
          direction={{ base: "column", md: "row" }}
        >
          <Box w="100%" p={8}>
            <Center mb={6}>
              <Text fontSize="3xl" fontWeight="bold">
                Login
              </Text>
            </Center>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<EmailIcon color="gray.300" />}
                    />

                    <Input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<LockIcon color="gray.300" />}
                    />
                    <Input
                      pr="4.5rem"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                    />
                    <InputRightElement>
                      <IconButton
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        bg="gray.200"
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button
                  colorScheme="blue"
                  type="submit"
                  w="full"
                  mt={9}
                  isLoading={isLoading}
                  spinner={<Spinner color="blue.500" />}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Container>
    </Center>
  );
};

export default Login;
