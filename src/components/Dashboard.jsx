import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import userIcon from "../images/user.png"
import postIcon from "../images/clipboard.png"
import pageIcon from "../images/document.png"
import { useNavigate } from 'react-router-dom'
import {HiUsers} from "react-icons/hi"
import { BsFillFileEarmarkPostFill } from 'react-icons/bs'
import { MdOutlineContactPage } from 'react-icons/md'
const Dashboard = () => {
  // let url="https://api.srwater.in"
  const navigate=useNavigate()
  const [user,setUser]=useState(0)
  const [blog,setBlog]=useState(0)


  const getData=async()=>{
    try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/user`)
        data=await data.json()
        
        setUser(data.data.length)
    } catch (error) {
        console.log(error);
    }
}

useEffect(()=>{
  getData()
  
},[])
  return (
    <Flex justifyContent={"space-around"} gap="40px" >
  <Card bgGradient='linear(to-r, white, gray.300)'>
    <CardHeader>
      <Heading size='md'> User</Heading>
    </CardHeader>
    <CardBody>
      <Text>You Have {user} Users in your database.Click on button below to view all users.</Text>
    </CardBody>
    <CardFooter justifyContent={"space-around"} alignItems={"center"} >
        <HiUsers size="70px" color='#ccd6e1' />
      <Button mt={"10px"}bgColor={"gray.100"} border="1px solid #161616" onClick={()=>navigate("/admin/user")}>View all Users</Button>
    </CardFooter>
  </Card>
  {/* <Card bgGradient='linear(to-r, white, gray.300)'>
    <CardHeader>
      <Heading size='md'> Post</Heading>
    </CardHeader>
    <CardBody>
      <Text>You Have {blog} Posts in your database.Click on button below to view all posts.</Text>
    </CardBody>
    <CardFooter justifyContent={"space-around"} alignItems={"center"}>
    <BsFillFileEarmarkPostFill size="70px" color='#ccd6e1' />
      <Button mt={"10px"} bgColor={"gray.100"} onClick={()=>navigate("/admin/blog")} border="1px solid #161616">View all Posts</Button>
    </CardFooter>
  </Card> */}
  <Card bgGradient='linear(to-r, white, gray.300)'>
    <CardHeader>
      <Heading size='md'> Page</Heading>
    </CardHeader>
    <CardBody>
      <Text>You Have 3 Pages in your database.Click on button below to view all pages.</Text>
    </CardBody>
    <CardFooter justifyContent={"space-around"} alignItems={"center"}>
    <MdOutlineContactPage size="70px" color='#ccd6e1'/>
      <Button mt={"10px"} bgColor={"gray.100"} onClick={()=>navigate("/admin/page")}  border="1px solid #161616">View all Pages</Button>
    </CardFooter>
  </Card>
</Flex>
  )
}

export default Dashboard