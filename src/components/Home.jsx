import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [dataUrl, setDataUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  let url = process.env.REACT_APP_DEV_URL;
  let formData = new FormData();

  const [detail, setDetail] = useState({
    banner_heading: "",
    banner_subTitle: "",
    banner_text: "",
    Banner_images: [],
    event_heading: ["", ""],
    event_date: ["", ""],
    event_text: ["", ""],
  });

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleDateChange = (e, idx) => {
    const updatedDates = [...detail.event_date];
    updatedDates[idx] = e.target.value;
    setDetail({ ...detail, event_date: updatedDates });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
  };

  const handleFileChanger = (e) => {
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
    formData.append("home", image);
    setIsLoading(true);
    try {
      let data = await axios.post(`${url}/home/image`, formData, {
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

      setImageUrl(data.data.data);
      setDetail({ ...detail, Banner_images: [...detail.Banner_images, data.data.data] });
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
    }
  };

  const editHome = async () => {
    try {
      let data = await fetch(`${url}/home/edit/${detail._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(detail),
      });
      data = await data.json();
      toast({
        title: "Home Page Edited",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/admin/page");
    } catch (error) {
      toast({
        title: "Error In Uploading Updates",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
    setIsLoading(false);
  };

  const getHome = async () => {
    try {
      let data = await fetch(`${url}/home`);
      data = await data.json();
      setDetail(data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHome();
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
          <FormLabel>Banner Heading</FormLabel>
          <Input
            value={detail.banner_heading}
            name="banner_heading"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Banner Subtitle</FormLabel>
          <Input
            value={detail.banner_subTitle}
            name="banner_subTitle"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Banner Text</FormLabel>
          <Textarea
            value={detail.banner_text}
            name="banner_text"
            onChange={handleChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Banner Images</FormLabel>
          <Input type="file" onChange={handleFileChanger} />
          <Button colorScheme={"blue"} mt={2} onClick={submitFile} isLoading={isLoading}>
            Upload
          </Button>
          <SimpleGrid columns={3} spacing={2}>
            {detail.Banner_images.map((img, idx) => (
              <Image key={idx} src={`${url}/homebannerimage/${img}`} />
            ))}
          </SimpleGrid>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Event Headings</FormLabel>
          {detail.event_heading.map((heading, idx) => (
            <Input
              key={idx}
              value={heading}
              name="event_heading"
              onChange={(e) => {
                const updatedHeadings = [...detail.event_heading];
                updatedHeadings[idx] = e.target.value;
                setDetail({ ...detail, event_heading: updatedHeadings });
              }}
            />
          ))}
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Event Dates</FormLabel>
          {detail.event_date.map((date, idx) => (
            <Input
              key={idx}
              type="date"
              value={formatDate(date)} // Format date for input
              onChange={(e) => handleDateChange(e, idx)} // Update date on change
            />
          ))}
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Event Texts</FormLabel>
          {detail.event_text.map((text, idx) => (
            <Textarea
              key={idx}
              value={text}
              name="event_text"
              onChange={(e) => {
                const updatedTexts = [...detail.event_text];
                updatedTexts[idx] = e.target.value;
                setDetail({ ...detail, event_text: updatedTexts });
              }}
            />
          ))}
        </FormControl>
        <br />
        <Button colorScheme={"blue"} onClick={editHome} isLoading={isLoading}>
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default Home;
