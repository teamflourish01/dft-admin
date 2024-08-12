import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category,setCategory]=useState({
        name:"",
        order:1,
        slug:""
    })

    const navigate=useNavigate()
    const toast=useToast()
    // let url="https://api.srwater.in"

    const handleSave=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/category/add`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(category)
            })
            data=await data.json()
            toast({
                title: 'New Category Created',
                description: data.msg,
                status: 'success',
                position:"top",
                duration: 7000,
                isClosable: true,
              })
                navigate("/admin/category")
        } catch (error) {
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

    const handleSaveAndNew=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/category/add`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(category)
            })
            data=await data.json()
            toast({
                title: 'New Category Created',
                description: data.msg,
                status: 'success',
                position:"top",
                duration: 7000,
                isClosable: true,
              })
                setCategory({...category,name:"",order:1,slug:""})
        } catch (error) {
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

    const handleChange=(e)=>{
        const {name,value}=e.target
        setCategory({...category,[name]:value})
    }
  return (
    <div>
        <Flex justifyContent={"center"}  >
            <Box bgColor="white"  border={"1px solid #161616"} width={["100%","80%","60%","50%"]} padding={"20px"} borderRadius="20px">
                <FormControl isRequired >
                    <FormLabel m={"0"} >Name</FormLabel>
                    <Input type="text" value={category.name} name="name" onChange={(e)=>handleChange(e)} />
                </FormControl>
                <FormControl isRequired mt={"10px"}>
                    <FormLabel m="0">Order</FormLabel>
                    <Input type="number" value={category.order} name="order" onChange={(e)=>handleChange(e)} />
                </FormControl>
                <FormControl isRequired mt={"10px"} >
                    <FormLabel m="0">Slug</FormLabel>
                    <Input type="text" value={category.slug} name="slug" onChange={(e)=>handleChange(e)} />
                </FormControl>
                <br />
                <ButtonGroup gap="40px">
                <Button
                variant={"solid"}
                bgColor={"#161616"}
                color="white"
                _hover={{
                color: "black",
                bgColor: "white",
                border: "1px solid #161616",
                }}
                onClick={handleSave}
                isDisabled={!category.name}
                >
                Save
                </Button>
                <Button
                 variant={"solid"}
                bgColor={"#161616"}
                color="white"
                _hover={{
                  color: "black",
                  bgColor: "white",
                  border: "1px solid #161616",
                }}
                onClick={handleSaveAndNew}
                isDisabled={!category.name}
                >Save & Add New</Button>
                    </ButtonGroup>
            </Box>
        </Flex>
    </div>
  )
}

export default AddCategory