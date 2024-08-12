import { AddIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Inquiry = () => {
    const navigate=useNavigate()
    const [data,setData]=useState([])
    let url=process.env.REACT_APP_DEV_URL
    const [search,setSearch]=useState("")
    const [page,setPage]=useState(1)
    const [count,setCount]=useState(0)
    const [flag,setFlag]=useState(true)

    const getCount=async()=>{
      try {
        let data =await fetch(`${url}/contact/detail`)
        data=await data.json()
        console.log(data);
        setCount(data.data.length)
    } catch (error) {
        console.log(error);
    }
    }


    const getData=async()=>{
        try {
            let data=await fetch(`${url}/contact/detail?page=${page}`)
            data=await data.json()
            setData(data.data)
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearch=async()=>{
      try {
          if(search){
            let data=await fetch(`${url}/contact/${search}`)
            data=await data.json()
            setData(data.data)
          }else{
            getData()
          }
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
            <Flex gap={5} justifyContent={"flex-end"}>
           
            <Box>
            Search:<Input w="150px" onBlur={()=>setFlag(true)} onChange={(e)=>{setFlag(false);setSearch(e.target.value)}}  value={search} onKeyUp={handleSearch} />
            </Box>
            {/* <Button border={"1px solid #cfcccc"} rightIcon={<DeleteIcon/>}>
                Bulk Delete
            </Button> */}
        </Flex>
        <br/>
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
  <Table variant='simple'>
    <TableCaption borderTop={"1px solid #161616"}>There Are {count} Inquiries</TableCaption>
    <Thead>
      <Tr>
        <Th>#</Th>
        <Th>Name</Th>
        <Th >Inquiry No.</Th>
        <Th>Email</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {data?.map((e,i)=>{
        return <Tr >
            <Td> {i+1} </Td>
            <Td> {e.name} </Td>
            <Td>{e.inquiry_number}</Td>
            <Td>{e.email}</Td>            
            <Td>  
                <ButtonGroup>
                <Button leftIcon={<ViewIcon/>} bgColor={"#161616"} variant="solid" color="white" onClick={()=>navigate(`/admin/inquiry/${e._id}`)}>View</Button>
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

export default Inquiry