import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import userContext from "../context/userDetails";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

const Profile = () => {
  const { userData } = useContext(userContext);
  const navigate = useNavigate();
  return (
    <>
      <Box
        minH="50vh"
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundImage={
          "https://t4.ftcdn.net/jpg/02/98/10/01/240_F_298100132_hJMu7f0y1dhNiun9culQcrL8KXxIi5pF.jpg"
        }
      ></Box>

      <Flex className="profile-avtar"  >
      <div  >
      
       

        {userData.image ==
        "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png" ? (
          <Avatar
            ml="4"
            size="2xl"
            name="anubra266"
            src={userData.image}
            cursor="pointer"
          />
        ) : (
          <Avatar
            ml="4"
            size="2xl"
            name="anubra266"
            src={"https://api.srwater.in/profile/" + userData.image}
            cursor="pointer"
          />
        )}
        <Text>{userData.email}</Text>
        <Text>{userData.name}</Text>
        <Button
          variant="outline"
          onClick={() => navigate(`/admin/profile/${userData._id}`)}
          >
          Edit Profile
        </Button>
       
          </div>
           </Flex>
    </>
  );
};

export default Profile;
