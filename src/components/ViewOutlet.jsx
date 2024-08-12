import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'

const ViewOutlet = () => {
    const {id}=useParams()
    const navigate=useNavigate()
    const [outlet,setOutlet]=useState({})
    const toast=useToast()


    const url=process.env.REACT_APP_DEV_URL

    const getData=async()=>{
          try {
              let data=await fetch(`${url}/store/${id}`)
              data=await data.json()
              console.log(data.data);
              setOutlet(data.data)
          } catch (error) {
              console.log(error);
          }
      }

      const handleDelete=async()=>{
        try {
          let res=await fetch(`${url}/store/delete/${id}`,
          {
              method:"DELETE",
              headers:{
                  "Content-Type": "application/json"
              }
          })
          res=await res.json()
          //console.log(res);
          toast({
            title: 'Store Deleted',
            description: res.msg,
            status: 'success',
            position:"top",
            duration: 7000,
            isClosable: true,
          })
          navigate("/admin/store")
      } catch (error) {
          console.log(error);
          toast({
            title: "Invalid Response",
            description: error.message,
            status: 'error',
            position:"top",
            duration: 7000,
            isClosable: true,
          })
      }
      }
      useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        <Flex gap="20px">
        <Text fontSize={"xl"} fontWeight={"semibold"}>View Store Details</Text>
        <Button
            borderRadius={"20px"}
            bgColor={"green.100"}
            _hover={{color:"green.300",bgColor:"#eef1f4"}}
          leftIcon={<BiEditAlt  />}
          onClick={() => navigate(`/admin/store/edit/${id}`)}
        >
          Edit
        </Button>
        <Button
        borderRadius={"20px"}
        bgColor={"red.200"}
        _hover={{color:"red.300",bgColor:"#eef1f4"}}
      leftIcon={<RiDeleteBin6Line/>}
        onClick={handleDelete}
        >
            Delete
        </Button>
      </Flex>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Store Name</Text>
      <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{outlet?.name}</Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Address</Text>
      <Text padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{outlet?.address} </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Contact</Text>
      <Text padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{outlet?.contact}</Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Created at</Text>
      {outlet.createdAt && 
       
        <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {new Date(outlet?.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
        </Box>
      }
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Updated at</Text>
      {outlet?.modifiedAt && 
       
        <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {new Date(outlet?.modifiedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
        </Box>
      }
    </div>
  )
}

export default ViewOutlet