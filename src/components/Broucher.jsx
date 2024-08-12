import { AddIcon, DeleteIcon} from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'
import { BiEditAlt } from 'react-icons/bi'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Broucher = () => {
    const navigate=useNavigate()
    const [broucher,setBroucher]=useState([])
  // const url = "https://api.srwater.in";
  // const url = "http://192.168.1.18:8000";

  const [search,setSearch]=useState("")
  const [page,setPage]=useState(1)
  const [count,setCount]=useState(0)
  const [flag,setFlag]=useState(true)

  const toast=useToast()

  const getCount=async()=>{
    try {
      let data =await fetch(`${process.env.REACT_APP_DEV_URL}/broucher`)
      data=await data.json()
      console.log(data);
      setCount(data.data.length)
  } catch (error) {
      console.log(error);
  }
  }


    const getData=async()=>{
      try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/broucher?page=${page}`)
        data=await data.json()
        setBroucher(data.data)
      } catch (error) {
        console.log(error);
      }
    }

    const handleSearch=async()=>{
      try {
          if(search){
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/broucher/search/${search}`)
            data=await data.json()
            setBroucher(data.data)
          }else{
            getData()
          }
        } catch (error) {
          console.log(error);
        }
      }

    const handleDelete=async(id)=>{
      try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/broucher/delete/${id}`,{
        method:"DELETE",
        headers:{
          "Content-Type": "application/json"
        }
        })
        data=await data.json()
        toast({
          title: "Catalouge Deleted Successfully",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
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
        <Button leftIcon={<AddIcon/>} border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/broucher/add")}>
            Add New
        </Button>
        <Box>
            Search:<Input w="150px" onBlur={()=>setFlag(true)} onChange={(e)=>{setFlag(false);setSearch(e.target.value)}}  value={search} onKeyUp={handleSearch} />
            </Box>
    </Flex>
    <br/>
    <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
<Table variant='simple'>
<TableCaption borderTop={"1px solid #161616"}>There Are {count} Cetalouges</TableCaption>
<Thead>
  <Tr>
    <Th>#</Th>
    <Th>Name</Th>
    <Th >Action</Th>
    <Th >Updated On</Th>
    
  </Tr>
</Thead>
<Tbody>
{broucher?.map((e,i)=>{
    return <Tr >
        <Td>{i+1} </Td>
        <Td>{e.name}</Td>

       <Td >
         {new Date(e.modifiedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
       </Td>
     
        <Td>  
            <ButtonGroup>
            <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/broucher/edit/${e._id}`)}>Edit</Button>
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

export default Broucher