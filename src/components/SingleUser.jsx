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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios"
import userContext from "../context/userDetails";

const SingleUser = () => {
  const { userid } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataUrl,setDataUrl]=useState("")
  const [password, setPassword] = useState("");
  const formData=new FormData()
  const [image,setImage]=useState({})
  const toast=useToast()
  const navigate=useNavigate()
  
  const {userData}=useContext(userContext)
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  //             fetch fnc
  const getSingleDetail = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/user/${userid}`);
      data = await data.json();
      setUser(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (imageUrl) => {
    try {
      console.log(imageUrl);
      
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/user/edit/${userid}`, {
        method: "POST",
        body: JSON.stringify({...user,image:imageUrl}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      console.log(data.data);
      toast({
        title: "Profile Updated",
        description:data.msg,
        status:"success",
        duration: 7000,
        position:"top",
        isClosable: true,
      });
      setUser( { ...user,name: data.data.name, email: data.data.email,image:data.data.image });
      navigate("/admin/user")
    }
    catch (error) {
      console.log(error);
      toast({
        title: "Error in Updating",
        description:error.message,
        status:"error",
        duration: 7000,
        position:"top",
        isClosable: true,
      });
    }
  };

  const updatePassword = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/login/register`, {
        method: "POST",
        body: JSON.stringify({ ...user, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      toast({
        title: "Profile Updated",
        description:data.msg,
        status:"success",
        duration: 7000,
        position:"top",
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.log(error);
      toast({
        title: "Profile Update Fail ",
        description:error.message,
        status:"error",
        duration: 7000,
        position:"top",
        isClosable: true,
      });
    }
    navigate("/admin/user")
  };
  //          input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChanger=(e)=>{
    let file=e.target.files[0]
    setImage(file)
    if(file){
        let reader=new FileReader();
        reader.onloadend=()=>{
            setDataUrl(reader.result)
            console.log("image",image);
        }
    reader.readAsDataURL(file);
    }
  }
  const submitFile=async()=>{
    if(dataUrl==""){
      return
    }
    formData.append("avatar",image)
    try {
      let data=await axios.post(`${process.env.REACT_APP_DEV_URL}/user/profile/image`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      console.log(data.data.data);
      console.log("submitFile",user);
      return data.data.data
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getSingleDetail();
  }, [dataUrl]);
  return (
    <Flex justifyContent={"center"}>
      <Box
        w={["100%", "75%", "50%", "40%", "40%"]}
        borderRadius={"20px"}
        mt={"5%"}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
        padding={"10px"}
      >
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            required
            w={["xs", "xs", "xs", "sm", "sm"]}
            type="text"
            name="name"
            value={user.name}
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            required
            w={["xs", "xs", "xs", "sm", "sm"]}
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
          />
        </FormControl>
        <Text textAlign={"end"} _hover={{cursor:"pointer"}} color={"blue.500"} fontSize={"large"} onClick={onOpen}>
          Change Password
        </Text>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay/>
          <ModalContent>
            <ModalHeader>Change Password</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  required
                  w={["xs", "xs", "xs", "sm", "sm"]}
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => handleChange(e)}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Text>Leave It For No Change</Text>
                <Input
                  required
                  w={["xs", "xs", "xs", "sm", "sm"]}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  value={password}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={updatePassword}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <FormLabel>Profile Pic</FormLabel>
        <Box w="150px"    border={"1px dashed gray"  } >
          {dataUrl?<Image w="150px" height={"150px"} src={dataUrl}/>:userData.image=="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"?<Image w="150px" height={"150px"} src={userData?.image}/>:!user.image?<Image w="150px" height={"150px"} src="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"/>:<Image w="150px" height={"150px"} src={"https://api.srwater.in/profile/"+user.image}/>}
        </Box>
        <br />
        <Box >
          <form  encType="multipart/form-data">
            <input required type="file" name="avatar" id="filepicker" onChange={(e)=>handleFileChanger(e)} />
          </form>
        </Box>
          <Text><span style={{fontWeight:"bold"}}>Note:</span>Upload Only 200pxX200px photo and less than 500KB size</Text>
        <br />
        <Button onClick={()=>submitFile().then((res)=>handleUpdate(res))}>Save</Button>
      </Box>
    </Flex>
  );
};

export default SingleUser;
