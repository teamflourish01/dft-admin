import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditCategory = () => {
    const {categoryid}=useParams()
    const toast = useToast()
    const [category,setCategory]=useState({})
    const navigate=useNavigate()
    // let url="https://api.srwater.in"

    const getData=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/category/${categoryid}`)
            data=await data.json()
            console.log(data.data)
            setCategory(data.data[0])
        } catch (error) {
            console.log(error);
        }
    }

    const editData=async()=>{
        try {
            let data =await fetch(`${process.env.REACT_APP_DEV_URL}/category/edit/${categoryid}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(category)
            }) 
            
            data=await data.json()
            
            toast({
                title: 'Category Updated',
                description: data.msg,
                status: 'success',
                position:"top",
                duration: 7000,
                isClosable: true,
              })
              navigate("/admin/category")
            // console.log(data.data);
        } catch (error) {
            // console.log(error);
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
        let {value,name}=e.target
        setCategory({...category,[name]:value})
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        <center>
        <Box width={"50%"} padding="20px"  borderRadius={"20px"} boxShadow={"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"}>
            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={category.name} onChange={(e)=>handleChange(e)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Order</FormLabel>
                <Input type="Number" name="order" value={category.order} onChange={(e)=>handleChange(e)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Slug</FormLabel>
                <Input type="text" name="slug" value={category.slug} onChange={(e)=>handleChange(e)} />
            </FormControl>
            <br />
        <Button bgColor="#161616" color="white" onClick={editData}>Edit Item</Button>
        </Box>
        </center>
    </div>
  )
}

export default EditCategory