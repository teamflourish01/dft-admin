import { Avatar, Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

const ViewUser = () => {
  const { userid } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const getSingleDetail = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${userid}`);
      data = await data.json();
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleDetail();
  }, []);
  return (
    <div>
      <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>View User Details</Text>
        <Button
            borderRadius={"20px"}
            bgColor={"green.100"}
            _hover={{color:"green.300",bgColor:"#eef1f4"}}
          leftIcon={<BiEditAlt/>}
          onClick={() => navigate(`/admin/profile/${userid}`)}
        >
          Edit
        </Button>
      </Flex>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Name</Text>
      <Box padding="10px 20px" width="60%" bgColor={"#eef1f4"} fontSize={"medium"}>{user.name}</Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Email</Text>
      <Box padding="10px 20px" width="60%" bgColor={"#eef1f4"}  fontSize={"medium"}>{user.email} </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Image</Text>
      
      {!user.image ? (
        <Avatar
          ml="4"
          size="2xl"
          name="anubra266"
          src={
            "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"
          }
          cursor="pointer"
        />
      ) : (
        <Avatar
          ml="4"
          size="2xl"
          name="anubra266"
          src={`${process.env.REACT_APP_DEV_URL}/profile/`+ user.image}
          cursor="pointer"
        />
      )}
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Created at</Text>
      {user.createdAt && 
       
        <Box padding="10px 20px" width="60%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {new Date(user.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
        </Box>
      }
      <Text fontWeight={"semibold"} fontSize={"xl"}>Modified at</Text>
      {user.modifiedAt && 
       
        <Box padding="10px 20px" width="60%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {new Date(user.modifiedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
        </Box>
      }
      <br />
    </div>
  );
};

export default ViewUser;
