import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
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
  IconButton,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const SingleUser = () => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [userData, setUserData] = useState({});
  const [singleImg, setSingleImg] = useState("");
  const [selectSingImg, setSelectSingImg] = useState("");
  const toast = useToast();
  const navigate = useNavigate();
  const url = process.env.REACT_APP_DEV_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPassword, setShowPassword] = useState(false);

  const getData = async () => {
    try {
      let data = await fetch(`${url}/user/${id}`);
      data = await data.json();
      const { password, ...restData } = data.data; // Password remove to reset
      setUserData(restData);
      reset(restData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.password) {
        formData.append("password", data.password);
      }
      if (singleImg) {
        formData.append("image", singleImg);
      }
      const response = await axios.put(`${url}/user/edit/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast({
          title: "Data Update Successfully",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/user");
      }
    } catch (error) {
      console.error("Update failed", error);
      toast({
        title: "Data Not Updated",
        description: error.response?.data.msg || "User is Alredy Exist ! ",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setSingleImg(file);
      const imageUrl = URL.createObjectURL(file);
      setSelectSingImg(imageUrl);
    } else {
      setSingleImg("");
      setSelectSingImg("");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Flex justifyContent={"center"} p="4">
      <Box
        w={["100%", "75%", "50%", "40%", "45%"]}
        borderRadius={"20px"}
        mt={"5%"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
        padding={"10px"}
      >
        <form onSubmit={handleSubmit(handleUpdate)}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              required
              w={["xs", "xs", "xs", "sm", "sm"]}
              type="text"
              name="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <Text color="red">{errors.name.message}</Text>}
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              required
              w={["xs", "xs", "xs", "sm", "sm"]}
              type="email"
              name="email"
              {...register("email")}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              title="Please enter a valid email address (e.g., user@example.com)"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup ml="115px" w={["xs", "xs", "xs", "sm", "sm"]}>
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="If not change Password Left this field"
                {...register("password")}
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

          <br />
          <FormLabel>Profile Pic</FormLabel>
          <Box w="150px" border={"1px dashed gray"}>
            {selectSingImg ? (
              <Image w="150px" height={"150px"} src={selectSingImg} />
            ) : userData.image ===
              "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" ? (
              <Image w="150px" height={"150px"} src={userData.image} />
            ) : !userData.image ? (
              <Image
                w="150px"
                height={"150px"}
                src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
              />
            ) : (
              <Image
                w="150px"
                height={"150px"}
                src={`${url}/user/` + userData.image}
              />
            )}
          </Box>
          <br />
          <Box>
            <input
              type="file"
              name="image"
              id="filepicker"
              onChange={handleFileChange}
            />
          </Box>
          <Text>
            <span style={{ fontWeight: "bold" }}>Note:</span>Upload Only
            200pxX200px photo and less than 500KB size
          </Text>
          <br />
          <Button type="submit">Save</Button>
        </form>
      </Box>
    </Flex>
  );
};

export default SingleUser;
