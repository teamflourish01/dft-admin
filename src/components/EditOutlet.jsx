import { Box, Button, FormControl, FormLabel, Input, Textarea, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditOutlet = () => {
    const {id}=useParams()
    const toast = useToast()
    const [store,setStore]=useState({})
    const navigate=useNavigate()

    let url=process.env.REACT_APP_DEV_URL 

    const getData=async()=>{
        try {
            let data=await fetch(`${url}/store/${id}`)
            data=await data.json()
            console.log(data.data)
            setStore(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const editData=async()=>{
        try {
            let data =await fetch(`${url}/store/edit/${id}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(store)
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
              navigate("/admin/store")
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
        setStore({...store,[name]:value})
    }
    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
             <center>
        <Box width={"50%"} padding="20px"  borderRadius={"20px"} boxShadow={"rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;"}>
            <FormControl isRequired>
                <FormLabel>Store Name</FormLabel>
                <Input type="text" name="name" value={store?.name} onChange={(e)=>handleChange(e)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Textarea type="text" name="address" value={store?.address} onChange={(e)=>handleChange(e)} />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Contact</FormLabel>
                <Input type="text" name="contact" value={store?.contact} onChange={(e)=>handleChange(e)} />
            </FormControl>
            <br />
        <Button bgColor="#161616" color="white" onClick={editData}>Edit Item</Button>
        </Box>
        </center>
    </div>
  )
}

export default EditOutlet