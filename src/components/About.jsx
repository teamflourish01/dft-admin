import {
  Box,
  Button,
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
import { useNavigate } from "react-router-dom";

const About = () => {
  const [dataUrl, setDataUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const url = process.env.REACT_APP_DEV_URL;

  const [detail, setDetail] = useState({
    About_heading: "",
    About_text: "",
    Our_mision_heading: "",
    Our_mision_text: "",
    Our_vision_heading: "",
    Our_vision_text: "",
    About_images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleFileChange = (e) => {
    let file = e.target.files[0];
    setImage(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitFile = async () => {
    if (dataUrl === "") {
      return;
    }
    const formData = new FormData();
    formData.append("about", image);
    setIsLoading(true);
    try {
      let data = await axios.post(`${url}/about/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Image Uploaded Successfully",
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });

      setImagePreview(`${url}/uploads/aboutimage/${data.data.data}`);
      setDetail({ ...detail, About_images: [...detail.About_images, data.data.data] });
      return data.data.data;
    } catch (error) {
      toast({
        title: "Error In Uploading Image",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const editAbout = async () => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key in detail) {
      formData.append(key, detail[key]);
    }
    try {
      let response = await fetch(`${url}/aboutpage/update/${detail._id}`, {
        method: "PUT",
        body: formData,
      });
      let data = await response.json();
      toast({
        title: "About Page Updated",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/admin/page");
    } catch (error) {
      toast({
        title: "Error Updating About Page",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getAbout = async () => {
    try {
      let response = await fetch(`${url}/about`);
      let data = await response.json();
      setDetail(data[0]);
      if (data[0]?.About_images) {
        setImagePreview(`${url}/aboutimage/${data[0].About_images}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  return (
    <div>
      <Box
        backgroundColor={"white"}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        padding={"20px"}
        borderRadius={"20px"}
      >
        <FormControl>
          <FormLabel>About Heading</FormLabel>
          <Input
            value={detail.About_heading}
            name="About_heading"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>About Text</FormLabel>
          <Textarea
            value={detail.About_text}
            name="About_text"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Our Mission Heading</FormLabel>
          <Textarea
            value={detail.Our_mision_heading}
            name="Our_mision_heading"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Our Mission Text</FormLabel>
          <Textarea
            value={detail.Our_mision_text}
            name="Our_mision_text"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Our Vision Heading</FormLabel>
          <Textarea
            value={detail.Our_vision_heading}
            name="Our_vision_heading"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Our Vision Text</FormLabel>
          <Textarea
            value={detail.Our_vision_text}
            name="Our_vision_text"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>About Images</FormLabel>
          <Input type="file" onChange={handleFileChange} />
          <Button colorScheme={"blue"} mt={2} onClick={submitFile} isLoading={isLoading}>
            Upload
          </Button>
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="About"
              style={{ marginTop: "10px", width: "200px", height: "auto" }}
            />
          )}
        </FormControl>
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
          onClick={editAbout}
        >
          Save About
        </Button>
      </Box>
    </div>
  );
};

export default About;
