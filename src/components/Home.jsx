import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Flex,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Home = () => {
  const [item, setItem] = useState({
    banner_heading: "",
    banner_subTitle: "",
    banner_text: "",
    Banner_images: [],
    event_heading: [],
    event_date: [],
    event_text: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [bannerUrl, setbannerUrl] = useState([]);
  const [bImage, setbImage] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  let url = process.env.REACT_APP_DEV_URL;
  const { id } = useParams();

  const getHomeById = async () => {
    try {
      const response = await fetch(`${url}/home/${id}`);
      const data = await response.json();
      console.log("Fetch data", data.data);

      setItem(data.data);

      console.log("State ById", item);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomeById();
  }, [id]);
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const handleDateChange = (e, idx) => {
    const updatedDates = [...item.event_date];
    updatedDates[idx] = e.target.value;
    setItem({ ...item, event_date: updatedDates });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setItem({ ...item, [name]: value });
  };

  // Banner-Images logic
  const handleBannerInputImage = (e) => {
    const file = e.target.files[0];
    console.log("select file", file);
    setbImage([...bImage, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setbannerUrl([...bannerUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleDeleteBannerImage = (index) => {
    setbImage((prev) => prev.filter((_, i) => i !== index));
    setbannerUrl((prev) => prev.filter((_, i) => i !== index));
  };
  const handledbbannerImage = (index) => {
    let dup = [...item.Banner_images];
    dup.splice(index, 1);

    setItem({ ...item, Banner_images: dup });
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    setIsLoading(true);
    let dup = { ...item };
    if (bImage.length > 0) {
      for (let x of bImage) {
        formData.append("Banner_images", x);
      }
    }
    
    formData.append("dup", JSON.stringify(dup));
    try {
      const response = await axios.put(`${url}/homepage/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast({
          title: "Data Edit Successfuly",
          description: response?.data?.msg,
          status: "success",
          position: "top",
          duration: 7000,
          isClosable: true,
        });
        navigate("/admin/page/");
      } else {
        toast({
          title: "Data Not Update ",
          description: response?.data?.msg,
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
        description: error?.response?.data?.msg || "An error occurred.",
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
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Banner Heading</FormLabel>
            <Input
              value={item.banner_heading}
              name="banner_heading"
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Banner Subtitle</FormLabel>
            <Input
              value={item.banner_subTitle}
              name="banner_subTitle"
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Banner Text</FormLabel>
            <Textarea
              value={item.banner_text}
              name="banner_text"
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Banner Images</FormLabel>
            <Input
              id="Banner_images"
              type="file"
              name="Banner_images"
              onChange={handleBannerInputImage}
              multiple
            />
            <Flex wrap="wrap">
              {bannerUrl &&
                bannerUrl?.map((e, i) => (
                  <Flex key={i} position="relative">
                    <Box>
                      <Image
                        src={e}
                        style={{
                          width: "300px",
                          marginRight: "10px",
                          marginBottom: "10px",
                        }}
                      />
                    </Box>
                    <MdDelete
                      color="red"
                      size={"40px"}
                      cursor="pointer"
                      onClick={() => handleDeleteBannerImage(i)}
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "5px",
                        marginTop: "-5px",
                        marginRight: "-8px",
                      }}
                    />
                  </Flex>
                ))}
              {item?.Banner_images &&
                item.Banner_images.map((e, i) => (
                  <Flex key={i} position="relative">
                    <Box>
                      <Image
                        src={`${url}/homebannerimage/${e}`}
                        style={{
                          width: "300px",
                          marginRight: "10px",
                        }}
                      />
                    </Box>
                    <MdDelete
                      color="red"
                      cursor="pointer"
                      size={"40px"}
                      onClick={() => handledbbannerImage(i)}
                      style={{
                        position: "absolute",
                        top: "4px",
                        right: "0",
                        marginTop: "-5px",
                        marginRight: "-8px",
                      }}
                    />
                  </Flex>
                ))}
            </Flex>

            {/* <SimpleGrid columns={3} spacing={2}>
            {item.Banner_images?.map((img, idx) => (
              <Image key={idx} src={`${url}/homebannerimage/${img}`} />
            ))}
          </SimpleGrid> */}
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Event Headings</FormLabel>

            {item.event_heading?.map((heading, idx) => (
              <Input
                key={idx}
                value={heading}
                name="event_heading"
                id="event_heading"
                type="text"
                onChange={(e) => {
                  const updatedHeadings = [...item.event_heading];
                  updatedHeadings[idx] = e.target.value;
                  setItem({ ...item, event_heading: updatedHeadings });
                }}
              />
            ))}
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Event Dates</FormLabel>

            {item.event_date?.map((date, idx) => (
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

            {item.event_text?.map((text, idx) => (
              <Textarea
                key={idx}
                value={text}
                name="event_text"
                maxLength={100}
                onChange={(e) => {
                  const updatedTexts = [...item.event_text];
                  updatedTexts[idx] = e.target.value;
                  setItem({ ...item, event_text: updatedTexts });
                }}
              />
            ))}
          </FormControl>
          <br />
          <Button colorScheme={"blue"} type="submit" isLoading={isLoading}>
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default Home;
