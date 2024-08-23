import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const About = () => {
  const [item, setItem] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [singleImg, setSingleImg] = useState("");
  const [selctSinImg, setselectSingImg] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  const url = process.env.REACT_APP_DEV_URL;
  const { id } = useParams();

  const getAboutusById = async () => {
    try {
      const response = await fetch(`${url}/about/${id}`);
      const data = await response.json();
      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAboutusById();
  }, [id]);

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      setSingleImg(file);

      // Display selected Img
      const imageUrl = URL.createObjectURL(file);
      setselectSingImg(imageUrl);
    } else {
      setSingleImg("");
      setselectSingImg("");
    }
  };
  const handleDeleteSingleImage = () => {
    setSingleImg("");
    setselectSingImg("");
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();

      formData.append("About_heading", item.About_heading);
      formData.append("About_text", item.About_text);
      formData.append("Our_mision_heading", item.Our_mision_heading);
      formData.append("Our_mision_text", item.Our_mision_text);
      formData.append("Our_vision_heading", item.Our_vision_heading);
      formData.append("Our_vision_text", item.Our_vision_text);

      if (singleImg) {
        formData.append("About_images", singleImg);
      }
      console.log("FormData:", formData);
      const response = await axios.put(
        `${url}/aboutpage/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Data Added Successfuly",
          description: response.data.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/page/");
      } else {
        toast({
          title: "Data Not Added ",
          description: response.data.msg,
          status: "error",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Update faild", error);
      toast({
        title: "Error",
        description: error.response?.data?.msg || "An error occurred.",
        status: "error",
        position: "top",
        duration: 7000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Box
        backgroundColor={"white"}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        padding={"20px"}
        borderRadius={"20px"}
      >
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <FormControl>
            <FormLabel>About Heading</FormLabel>
            <Input
              value={item.About_heading}
              name="About_heading"
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>About Text</FormLabel>
            <Textarea
              value={item.About_text}
              name="About_text"
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Our Mission Heading</FormLabel>
            <Textarea
              value={item.Our_mision_heading}
              name="Our_mision_heading"
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Our Mission Text</FormLabel>
            <Textarea
              value={item.Our_mision_text}
              name="Our_mision_text"
              maxLength={229}
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Our Vision Heading</FormLabel>
            <Textarea
              value={item.Our_vision_heading}
              name="Our_vision_heading"
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Our Vision Text</FormLabel>
            <Textarea
              value={item.Our_vision_text}
              name="Our_vision_text"
              maxLength={229}
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>About Images</FormLabel>
            <Input
              type="file"
              name="About_images"
              onChange={handleFileChange}
            />
            {/* <Button colorScheme={"blue"} mt={2} onClick={submitFile} isLoading={isLoading}>
            Upload
          </Button> */}
            {selctSinImg && (
              <Flex>
                <img
                  src={selctSinImg}
                  alt="selected img"
                  style={{
                    width: "300px",

                    margin: "5px",
                  }}
                />
                <MdDelete
                  color="red"
                  cursor={"pointer"}
                  size={"30px"}
                  onClick={handleDeleteSingleImage}
                />
              </Flex>
            )}
          </FormControl>
          {!selctSinImg && item.About_images && (
            <FormControl mr={4}>
              <Flex alignItems="center" position="relative">
                <img
                  src={`${url}/aboutimage/${item.About_images}`}
                  alt="selected img"
                  style={{
                    width: "300px",

                    margin: "5px",
                    marginBottom: "10px",
                  }}
                />
              </Flex>
            </FormControl>
          )}
          <br />
          <Button
            variant={"solid"}
            bgColor={"#161616"}
            color="white"
            _hover={{
              color: "black",
              bgColor: "white",
              border: "1px solid #161616",
            }}
            leftIcon={isLoading && <Spinner color="blue.500" />}
            type="submit"
          >
            Save About
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default About;
