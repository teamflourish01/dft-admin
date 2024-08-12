import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewNews = () => {
  const navigate = useNavigate();
  const { newsid } = useParams();
  const [news, setNews] = useState({});
  const url = process.env.REACT_APP_DEV_URL;
  const toast=useToast()

  const getData = async () => {
    try {
      debugger;
      let data = await fetch(`${url}/news/${newsid}`);
      data = await data.json();
      console.log(data.data);
      setNews(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      let data = await fetch(`${url}/news/delete/${newsid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      toast({
        title: "Item Deleted Successfully",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/admin/page/news")
    } catch (error) {
      console.log(error);
      toast({
        title: error.message,
        description: error,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Product Details
        </Text>
        <Button
          borderRadius={"20px"}
          bgColor={"green.100"}
          _hover={{ color: "green.300", bgColor: "#eef1f4" }}
          leftIcon={<BiEditAlt />}
          onClick={() => navigate(`/admin/page/news/edit/${newsid}`)}
        >
          Edit
        </Button>
        <Button
          borderRadius={"20px"}
          bgColor={"red.200"}
          _hover={{ color: "red.300", bgColor: "#eef1f4" }}
          leftIcon={<RiDeleteBin6Line />}
          onClick={() => handleDelete(newsid)}
        >
          Delete
        </Button>
      </Flex>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Title
      </Text>
      <Box
        padding="10px 20px"
        width="70%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {news.title}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Image
      </Text>
      <Image  src={`${url}/news/${news.image}`} />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Created at</Text>
      {news.createdAt && 
       
        <Box padding="10px 20px" width="60%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {news.createdAt.substring(0, 10)}{" "}
          {news.createdAt.substring(12, news.createdAt.length - 1)}
        </Box>
      }
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Updated at</Text>
      {news.modifiedAt && 
       
        <Box padding="10px 20px" width="60%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {news.modifiedAt.substring(0, 10)}{" "}
          {news.modifiedAt.substring(12, news.modifiedAt.length - 1)}
        </Box>
      }
    </div>
  );
};

export default ViewNews;
