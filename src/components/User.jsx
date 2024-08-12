import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {BiEditAlt} from "react-icons/bi"
import { useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const User = () => {
    const [user,setUser]=useState([])
    const [bulk,setBulk]=useState([])
    const [search,setSearch]=useState("")
    const navigate=useNavigate()
    const [page,setPage]=useState(1)
    const [count,setCount]=useState(0)
    const [flag,setFlag]=useState(true)
    let url=process.env.REACT_APP_DEV_URL

    const getData=async()=>{
        try {
            let data=await fetch(`${url}/user?page=${page}`)
            data=await data.json()
            console.log(data);
            setUser(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCount=async()=>{
        try {
        let data =await fetch(`${url}/user`)
        data=await data.json()
        console.log(data);
        setCount(data.data.length)
    } catch (error) {
        console.log(error);
    }
    }
    const handleSearch=async()=>{
        try {
            if(search){
              let data=await fetch(`${url}/user/search/${search}`)
              data=await data.json()
              setUser(data.data)
            }else{
              getData()
            }
        } catch (error) {
            console.log(error);
        }
        }

    const handleCheckBox=async(id,event)=>{
        console.log(!event.target.checked);
        try {
            let res=await fetch(`https://api.srwater.in/user/edit/${id}`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({isChecked:!event.target.checked})
            })
            res=await res.json()
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete=async(id)=>{
        try {
            let res=await fetch(`https://api.srwater.in/user/delete/${id}`,
            {
                method:"DELETE",
                headers:{
                    "Content-Type": "application/json"
                }
            })
            res=await res.json()
            console.log(res);
            getData()
        } catch (error) {
            console.log(error);
        }
    }
useEffect(()=>{
        getData()
        getCount()
    },[page])
  return (
    <div>
        <Flex gap={5} justifyContent={"space-between"}>
            <Button leftIcon={<AddIcon/>} border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/user/add")}>
                Add New
            </Button>
            <Box>
            Search:<Input w="150px" onChange={(e)=>setSearch(e.target.value)} onBlur={()=>setFlag(true)} value={search} onKeyUp={handleSearch} />
            </Box>
        </Flex>
        <br />
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
  <Table variant='simple'>
    <TableCaption borderTop={"1px solid #161616"}>There Are {count} Users</TableCaption>
    <Thead >
      <Tr >
        <Th>#</Th>
        <Th>Name</Th>
        <Th>UserID</Th>
        <Th >Created at</Th>
        <Th >Email</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {user?.map((e,i)=>{
        return <Tr >
            <Td> {i+1} </Td>
            <Td>{e.name}</Td>
            <Td>{e.email}</Td>
            <Td>{e.createdAt.substring(0,10)}</Td>
            <Td>{e.email}</Td>
            <Td>   
                <ButtonGroup>
                <Button leftIcon={<ViewIcon/>} bgColor={"#161616"} variant="solid" color="white" onClick={()=>navigate(`/admin/view/${e._id}`)}>View</Button>
                <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/profile/${e._id}`)}>Edit</Button>
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

export default User