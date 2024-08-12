import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewBlog = () => {
  const [blog, setBlog] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  const { blogid } = useParams();
  let url = process.env.REACT_APP_DEV_URL;
  const getBlog = async () => {
    try {
      let data = await fetch(`${url}/blog/${blogid}`);
      data = await data.json();
      setBlog(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    try {
      let data = await fetch(`${url}/blog/delete/${blogid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      toast({
        title: "Blog Deleted",
        description: data.msg,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      navigate("/admin/blog");
    } catch (error) {
      toast({
        title: error.message,
        description: error,
        status: "success",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    getBlog();
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
          onClick={() => navigate(`/admin/blog/edit/${blogid}`)}
        >
          Edit
        </Button>
        <Button
          borderRadius={"20px"}
          bgColor={"red.200"}
          _hover={{ color: "red.300", bgColor: "#eef1f4" }}
          leftIcon={<RiDeleteBin6Line />}
          onClick={() => handleDelete()}
        >
          Delete
        </Button>
      </Flex>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Name
      </Text>
      <Box
        padding="10px 20px"
        width="60%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {blog?.title}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Description
      </Text>
      <Box
        padding="10px 20px"
        width="60%"
        bgColor={"#eef1f4"}
        value={blog.content}
        fontSize={"medium"}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></Box>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Image
      </Text>
      <Image src={`${url}/blog/${blog.image}`} />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Created at
      </Text>
      {blog.createdAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(blog.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Updated at
      </Text>
      {blog.modifiedAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(blog.modifiedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
    </div>
  );
};

export default ViewBlog;
