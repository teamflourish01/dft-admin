import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";

const ViewInquiry = () => {
  const [inquiry, setInquiry] = useState({});
  const { id } = useParams();
  let url = process.env.REACT_APP_DEV_URL;

  const getData = async () => {
    try {
      let data = await fetch(`${url}/contact/detail/${id}`);
      data = await data.json();
      console.log(data);
      setInquiry(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>
          View Category Details
        </Text>
      </Flex>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Name
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {inquiry?.name}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Inquiry Number
      </Text>
      <Text
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {inquiry?.inquiry_number}{" "}
      </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Email
      </Text>
      <Text
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {inquiry?.email}
      </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Phone
      </Text>
      <Text
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {inquiry?.phone}
      </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Sales Person
      </Text>
      <Text
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {inquiry?.sales_person}
      </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Message
      </Text>
      <Text
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {inquiry?.message}
      </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Message Arrived At
      </Text>
      <Text
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {new Date(inquiry?.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
      </Text>
      <br />
    </div>
  );
};

export default ViewInquiry;
