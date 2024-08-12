import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddOutlet = () => {
    const [store,setStore]=useState({
        name:"",
        address:"",
        contact:""
    })

    const toast=useToast()
    const navigate=useNavigate()



    const handleSave=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_URL}/store/add`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(store)
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
                navigate("/admin/store")
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
        setStore({...store,[name]:value})
    }
  return (
    <div>
           <Flex justifyContent={"center"}  >
            <Box bgColor="white"  border={"1px solid #161616"} width={["100%","80%","60%","50%"]} padding={"20px"} borderRadius="20px">
                <FormControl isRequired >
                    <FormLabel m={"0"} >Name</FormLabel>
                    <Input type="text" value={store.name} name="name" onChange={(e)=>handleChange(e)} />
                </FormControl>
                <FormControl isRequired mt={"10px"}>
                    <FormLabel m="0">Address</FormLabel>
                    <Textarea type="number" value={store.address} name="address" onChange={(e)=>handleChange(e)} />
                </FormControl>
                <FormControl isRequired mt={"10px"} >
                    <FormLabel m="0">Contact</FormLabel>
                    <Input type="text" value={store.contact} name="contact" onChange={(e)=>handleChange(e)} />
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
                isDisabled={!store.name}
                >
                Save
                </Button>
                
                    </ButtonGroup>
            </Box>
        </Flex>
    </div>
  )
}

export default AddOutlet
