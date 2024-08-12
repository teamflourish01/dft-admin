import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddManager = () => {
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const toast=useToast()
    const navigate=useNavigate()

    const createUser=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_URL}/annual/manager/add`,{
                method:"POST",
                body:JSON.stringify({name,password}),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            data=await data.json()
            toast({
                title: 'Account Created',
                description: data.msg,
                status: 'success',
                duration: 9000,
                position:"top",
                isClosable: true,
            })
            navigate("/admin/annual/manager")
        } catch (error) {
            toast({
                title: error.message,
                description: error.msg,
                status: 'error',
                duration: 9000,
                position:"top",
                isClosable: true,
              })
        }
    }
  return (
    <div>
        <Box
        backgroundColor={"white"}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        padding={"20px"}
        borderRadius={"20px"}
    >
        <FormControl isRequired>
        <FormLabel>UserID</FormLabel>
        <Input
            value={name}
            name="title"
            onChange={(e) => setName(e.target.value)}
        />
        </FormControl>
        <br />
        <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input
            value={password}
            name="date"
            onChange={(e) => setPassword(e.target.value)}
        />
        </FormControl>
        <br />
        <Button
          variant={"solid"}
          bgColor={"#161616"}
          color="white"
          isDisabled={!name}
          _hover={{
            color: "black",
            bgColor: "white",
            border: "1px solid #161616",
          }}
          onClick={() =>createUser()}
        >
          Add New
        </Button>
      </Box>
    </div>
  )
}

export default AddManager