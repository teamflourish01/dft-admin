import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'

const ViewToken = () => {
    const navigate=useNavigate()
    const {id}=useParams()
    const [detail,setDetail]=useState({})

    const getData=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/annual/view/${id}`)
                data=await data.json()
                setDetail(data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getData()
    },[])
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
          onClick={() => navigate(`/admin/annual/edit/${id}`)}
        >
          Edit
        </Button>
      </Flex>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Client Name
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {detail?.name}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Challan Number
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
      >{detail?.challan_no}</Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Amount
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {detail?.amount}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        User
      </Text>
      <Box
        padding="10px 20px"
        width="50%"
        bgColor={"#eef1f4"}
        fontSize={"medium"}
      >
        {detail?.userid?.name}
      </Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Created at
      </Text>
      {detail.createdAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(detail.createdAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>
        Updated at
      </Text>
      {detail.modifiedAt && (
        <Box
          padding="10px 20px"
          width="50%"
          bgColor={"#eef1f4"}
          fontSize={"medium"}
        >
          {new Date(detail.modifiedAt).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </Box>
      )}
    </div>
  )
}

export default ViewToken