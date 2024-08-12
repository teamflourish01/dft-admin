import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup, Flex, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import DeleteBtn from './DeleteBtn'
import { useNavigate } from 'react-router-dom'

const News = () => {
    const navigate=useNavigate()
    const [news,setNews]=useState([])
  const url = process.env.REACT_APP_DEV_URL


    const getNews=async()=>{
      try {
        let data=await fetch(`${url}/news`)
        data=await data.json()
        console.log(data);
        setNews(data.data)
      } catch (error) {
        console.log(error);
      }
    }
    const handleDelete=async(id)=>{
      try {
        let data=await fetch(`${url}/news/delete/${id}`,{
          method:"DELETE",
          headers:{
            "Content-Type": "application/json"
          }
        })
        data=await data.json()
        getNews()
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
        getNews()
    },[])
  return (
    <div>
         <Flex gap={5}>
            <Button leftIcon={<AddIcon/>} border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/page/news/add")}>
                Add New
            </Button>
        </Flex>
        <br/>
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
  <Table variant='simple'>
    <TableCaption borderTop={"1px solid #161616"}>There Are {news?.length} News And Events</TableCaption>
    <Thead>
      <Tr>
        <Th>#</Th>
        <Th>Title</Th>
        <Th >image</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {news?.map((e,i)=>{
        return <Tr >
            <Td> {i+1} </Td>
            <Td>{e.title}</Td>
            <Td><Image w="120px" src={`${url}/news/${e.image}`}/></Td>
            <Td>  
                <ButtonGroup>
                <Button leftIcon={<ViewIcon/>} bgColor={"#161616"} variant="solid" color="white" onClick={()=>navigate(`/admin/page/news/${e._id}`)}>View</Button>
                <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/page/news/edit/${e._id}`)}>Edit</Button>
                <DeleteBtn handleDelete={()=>handleDelete(e._id)}/>
                </ButtonGroup>
            </Td>
        </Tr>
    })}
    </Tbody>
  </Table>
</TableContainer>
    </div>
  )
}

export default News