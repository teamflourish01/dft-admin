import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userDetails";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import back from "../images/back.png"

//                                    This is Login Page

const SignUp = () => {
  //                      Declaration
  const { userData, setUserData } = useContext(userContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [obj, setObj] = useState({
    email: "",
    password: "",
  });

  const [res,setRes]=useState({
    email:"",
    password:""
  })
  const toast = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const url="process.env.REACT_APP_DEV_URL"

  //                         functions


  const handleClick = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      data = await data.json();
      localStorage.setItem("user", JSON.stringify(data.userId));
      toast({
        title: `successfully LogIn`,
        status: "success",
        isClosable: true,
        position: "top",
      });
      let newTab = window.open(`${process.env.REACT_APP_DEV_URL}/admin`, "_blank");
      if (newTab == null) {
        toast({
          title: `The pop-up window was blocked. Please allow pop-ups for this site and try again.`,
          status: "error",
          isClosable: true,
          icon: <WarningTwoIcon />,
        });
      }

      // navigate("/admin")
    } catch (error) {
      console.log(error);
      toast({
        title: `Wrong Credentials`,
        status: "error",
        isClosable: true,
        position: "top",
        icon: <WarningTwoIcon />,
      });
    }
  };

  const updatePassword=async()=>{
    console.log(res);
    try {
      let data=await fetch(`${url}/user/forgot`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res)
      })
      data=await data.json()
      console.log(data);
      toast({
        title: data.msg,
        status: "success",
        isClosable: true,
        position: "top",
      })
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
        isClosable: true,
        position: "top",
        icon: <WarningTwoIcon />,
      });
    }
    onClose()
  }

  const handleForgot=(e)=>{
    setRes({
      ...res,
      [e.target.name]: e.target.value,
    });
  }

  const handleChange = (e) => {
    setObj({
      ...obj,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Flex
      justifyContent={"center"}
      backgroundImage={
        back
      }
      alignItems="center"
      padding={"20px"}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      height={"100vh"}
    >
      <Box
        zIndex={"10"}
        bgColor={"white"}
        height="400px"
        width="500px"
        borderRadius={"20px"}
        padding={"20px"}
      >
        <center >
          <FormControl isRequired mt={"30px"} >
            <FormLabel fontSize={"xl"}  >Email</FormLabel>
            <Input
              name="email"
              onChange={(e) => handleChange(e)}
              value={obj.email}
              placeholder="Enter Email"
              type="email"
              size={"lg"}
            />
          </FormControl>
          <FormControl isRequired mt="30px">
            <FormLabel fontSize={"xl"}>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                size={"lg"}
                onChange={(e) => handleChange(e)}
                value={obj.password}
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </InputRightElement>
            </InputGroup>
            <Text
              textAlign={"right"}
              color={"blue.400"}
              _hover={{ cursor: "pointer", color: "blue.600" }}
              onClick={onOpen}
              fontSize={"xl"}
            >
              Forgot Password ?
            </Text>
          </FormControl>
          <br />
          <Button
            color="white"
            onClick={handleClick}
            bgColor={"green.400"}
            isDisabled={!obj.email}
            size={"lg"}
            mt={"10px"}
          >
            LOGIN
          </Button>
        </center>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                required
                w={["xs", "xs", "xs", "sm", "sm"]}
                type="email"
                name="email"
                value={res.email}
                onChange={(e) => handleForgot(e)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Text>Leave It For No Change</Text>
              <Input
                required
                w={["xs", "xs", "xs", "sm", "sm"]}
                onChange={(e) => handleForgot(e)}
                type="password"
                name="password"
                value={res.password}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={updatePassword}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default SignUp;
