import { Box, Button, FormControl, FormLabel, Input, Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditToken = () => {
    const navigate=useNavigate()
    const {id}=useParams()
    const [detail,setDetail]=useState({
        name:"",
        amount:"",
        challan_no:"",
        userid:"",
        token:"",
        mobile:""
    })
    const [isLoading,setIsLoading]=useState(false)
    const toast=useToast()
    const getData=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/annual/view/${id}`)
                data=await data.json()
                setDetail(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/annual/edit/${detail?.token}`,{
                method:"POST",
                body:JSON.stringify(detail),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            data=await data.json()
            toast({
                title: 'Edit Successfully Done',
                position:"top",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            navigate("/admin/annual")
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <div>
        <Box>
        <FormControl>
          <FormLabel>Client Name</FormLabel>
          <Input value={detail?.name} onChange={(e) => setDetail({...detail,name:e.target.value}) } />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Challan Number</FormLabel>
          <Input value={detail?.challan_no} onChange={(e) => setDetail({...detail,challan_no:e.target.value}) } />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Mobile Number</FormLabel>
          <Input value={detail?.mobile} onChange={(e) => setDetail({...detail,mobile:e.target.value}) } />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Token</FormLabel>
          <Input value={detail?.token} isDisabled={true} />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>User</FormLabel>
          <Input
            value={detail?.userid.name}
            isDisabled={true}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <Input
            value={detail?.amount}
            onChange={(e)=>setDetail({...detail,amount:e.target.value})}
          />
        </FormControl>
        <br />
        
          <br />
          <Button
            variant={"solid"}
            bgColor={"#161616"}
            color="white"
            _hover={{
              color: "black",
              bgColor: "white",
              border: "1px solid #161616",
            }}
            leftIcon={isLoading && <Spinner color="blue.500" />}
            onClick={()=>handleEdit()}
          >
            Edit
          </Button>
        
      </Box>
    </div>
  )
}

export default EditToken