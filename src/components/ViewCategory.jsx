import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate, useParams } from 'react-router-dom'
import {RiDeleteBin6Line} from "react-icons/ri"

const ViewCategory = () => {
    const {categoryid}=useParams()
    const navigate=useNavigate()
    const [category,setCategory]=useState({})
    let url=process.env.REACT_APP_DEV_URL
    const toast=useToast()
    const getData=async()=>{
      console.log(categoryid);
        try {
            let data=await fetch(`${url}/category/${categoryid}`)
            data=await data.json()
            console.log(data.data);
            setCategory(data.data[0])
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete=async()=>{
      try {
        let res=await fetch(`${url}/category/delete/${categoryid}`,
        {
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        res=await res.json()
        //console.log(res);
        toast({
          title: 'Category Deleted',
          description: res.msg,
          status: 'success',
          position:"top",
          duration: 7000,
          isClosable: true,
        })
        navigate("/admin/category")
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
        <Text fontSize={"xl"} fontWeight={"semibold"}>View Category Details</Text>
        <Button
            borderRadius={"20px"}
            bgColor={"green.100"}
            _hover={{color:"green.300",bgColor:"#eef1f4"}}
          leftIcon={<BiEditAlt  />}
          onClick={() => navigate(`/admin/category/edit/${categoryid}`)}
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
      <Text fontWeight={"semibold"} fontSize={"xl"}>Name</Text>
      <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{category?.name}</Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Order</Text>
      <Text padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{category?.order} </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Slug</Text>
      <Text padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{category?.slug}</Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Created at</Text>
      {category.createdAt && 
       
        <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {new Date(category.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
        </Box>
      }
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Updated at</Text>
      {category.modifiedAt && 
       
        <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {new Date(category.modifiedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
        </Box>
      }
    </div>
  )
}

export default ViewCategory