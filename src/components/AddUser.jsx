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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState("");
  const [image, setImage] = useState({});
  const url = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();
  const toast = useToast();

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    setImage(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    let formData = new FormData();
    formData.append("dup", JSON.stringify(data));
    if (Object.keys(image).length > 0) {
      formData.append("user", image);
    }
    try {
      let response = await axios.post(`${url}/user/add`, formData);
      let responseData = response.data;
      if (responseData.data) {
        localStorage.setItem("token", responseData.token);
        toast({
          title: "User Added",
          description: responseData.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/user");
      } else {
        toast({
          title: "User Not Added",
          description: responseData.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box p="4">
      <Flex justifyContent={"space-around"} gap="40px">
        <Box
          backgroundColor={"white"}
          w="700px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                variant={"flushed"}
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <Text color="red.500">{errors.name.message}</Text>
              )}
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                variant="flushed"
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <Text color="red.500">{errors.email.message}</Text>
              )}
            </FormControl>
            <br />
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                variant="flushed"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <Text color="red.500">{errors.password.message}</Text>
              )}
            </FormControl>
            <br />
            <FormControl>
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
              <Input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Text>
                <span style={{ fontWeight: "bold" }}>Note:</span>Upload Only
                200pxX200px photo and less than 500KB size
              </Text>
            </FormControl>
            <br />
            <center>
              <Button
                type="submit"
                variant={"solid"}
                bgColor={"#161616"}
                color="#add8e6"
                _hover={{
                  color: "black",
                  bgColor: "#add8e6",
                  border: "1px solid #add8e6",
                }}
                leftIcon={isLoading && <Spinner color="blue.500" />}
                isDisabled={isLoading}
              >
                Add New{" "}
              </Button>
            </center>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AddUser;
