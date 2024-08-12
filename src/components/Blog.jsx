import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'


const Blog = () => {
    const navigate=useNavigate()
    const [blog,setBlog]=useState([])
    const toast=useToast()
    // let url="https://api.srwater.in"
  const [search,setSearch]=useState("")
    const [page,setPage]=useState(1)
    const [count,setCount]=useState(0)
    const [flag,setFlag]=useState(true)

    const getCount=async()=>{
      try {
        let data =await fetch(`${process.env.REACT_APP_DEV_URL}/blog`)
        data=await data.json()
        console.log(data);
        setCount(data.data.length)
    } catch (error) {
        console.log(error);
    }
    }


    const getBlog=async()=>{
      try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/blog?page=${page}`)
        data=await data.json()
        setBlog(data.data)
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    const handleSearch=async()=>{
      try {
          if(search){
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/blog/search/${search}`)
            data=await data.json()
            setBlog(data.data)
          }else{
            getBlog()
          }
        } catch (error) {
          console.log(error);
        }
      }


    const handleDelete=async(id)=>{
      try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/blog/delete/${id}`,{
          method:"DELETE",
          headers:{
            "Content-Type": "application/json"
          }
        })
        data=await data.json()
        toast({
          title: 'Blog Deleted',
          description: data.msg,
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        getBlog()
      } catch (error) {
        toast({
          title: error.message,
          description: error,
          status: 'success',
          duration: 9000,
          position:"top",
          isClosable: true,
        })
      }
    }
    useEffect(()=>{
      getBlog()
      getCount()
    },[page])
  return (
    <div>
        <Flex gap={5} justifyContent={"space-between"}>
            <Button leftIcon={<AddIcon/>} border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/blog/add")}>
                Add New
            </Button>
            <Box>
            Search:<Input w="150px" onBlur={()=>setFlag(true)} onChange={(e)=>{setFlag(false);setSearch(e.target.value)}}  value={search} onKeyUp={handleSearch} />
            </Box>
        </Flex>
        <br/>
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
  <Table variant='simple'>
    <TableCaption borderTop={"1px solid #161616"}>There Are {count} Blogs</TableCaption>
    <Thead>
      <Tr>
        <Th>#</Th>
        <Th>Title</Th>
        <Th>Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {blog?.map((e,i)=>{
        return <Tr >
            <Td> {i+1} </Td>
            <Td>{e.title}</Td>
            <Td>
                <ButtonGroup>
                <Button leftIcon={<ViewIcon/>} bgColor={"#161616"} variant="solid" color="white" onClick={()=>navigate(`/admin/blog/${e._id}`)}>View</Button>
                <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/blog/edit/${e._id}`)}>Edit</Button>
                <DeleteBtn handleDelete={()=>handleDelete(e._id)}/>
                </ButtonGroup>
            </Td>
        </Tr>
    })}
    </Tbody>
  </Table>
</TableContainer>
<br />
<Flex justifyContent={"center"}>
{flag&&<div>
          <Button variant={"outline"} border="1px solid #161616" isDisabled={page==1} onClick={()=>setPage(page-1)}><BsArrowLeft/></Button>
          <Button>{page}</Button>
          <Button variant={"outline"} border="1px solid #161616" isDisabled={page>=(count/12)} onClick={()=>setPage(page+1)}><BsArrowRight/></Button>
        </div>
        }
</Flex>
    </div>
  )
}

export default Blog