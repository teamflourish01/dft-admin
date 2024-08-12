import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const formData = new FormData();
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });
  const [dataUrl, setDataUrl] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const [image, setImage] = useState({});
  const toast = useToast()
  const navigate=useNavigate()
  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleFileChanger = (e) => {
    let file = e.target.files[0];
    console.log(file);
    setImage(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleUpdate = async (imageName) => {
    try {
      let data = await fetch("https://api.srwater.in/login/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, image: imageName }),
      });
      data = await data.json();
      console.log(data);
      setIsLoading(false)
      toast({
        title: 'Account created.',
        description: "We've created account for you.",
        status: 'success',
        position:"top",
        duration: 9000,
        isClosable: true,
      })
      navigate("/admin/user")
    } catch (error) {
      console.log(error);
      setIsLoading(false)
      toast({
        title: 'error While creating account',
        description: error.message,
        status: 'error',
        position:"top",
        duration: 9000,
        isClosable: true,
      })
    }
  };
  const submitFile = async () => {
    if(dataUrl==""){
      return
    }
    formData.append("profile", image);
    setIsLoading(true)
    try {
      let data = await axios.post(
        `https://api.srwater.in/user/profile/new`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data.data);
      console.log("submitFile", user);
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box>
      <Flex justifyContent={"space-around"} gap="40px">
        <Box
          backgroundColor={"white"}
          w="700px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              variant={"flushed"}
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              variant="flushed"
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              variant="flushed"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
        </Box>
        <Box
          backgroundColor={"white"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Profile</FormLabel>
            {dataUrl ? (
              <Image w="150px" h="150px" borderRadius={"50%"} src={dataUrl} />
            ) : (
              <Image
                w="150px"
                h="150px"
                src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
              />
            )}
            <br />
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="profile"
                onChange={(e) => handleFileChanger(e)}
              />
            </form>
          <Text><span style={{fontWeight:"bold"}}>Note:</span>Upload Only 200pxX200px photo and less than 500KB size</Text>
          </FormControl>
        </Box>
      </Flex>
      <br />
      <center>
        <Button
          variant={"solid"}
          bgColor={"#161616"}
          color="white"
          _hover={{
            color: "black",
            bgColor: "white",
            border: "1px solid #161616",
          }}
          leftIcon={isLoading&&<Spinner color='blue.500' />}
          onClick={()=>submitFile().then((res)=>handleUpdate(res))}
          isDisabled={!user.name}
        >
          Add New{" "}
        </Button>
      </center>
    </Box>
  );
};

export default AddUser;
