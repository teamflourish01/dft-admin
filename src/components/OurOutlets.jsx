import { AddIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const OurOutlets = () => {
    const [outlet,setOutlet]=useState([])
    const [search,setSearch]=useState("")
    const navigate=useNavigate()
    const [page,setPage]=useState(1)
    const [count,setCount]=useState(0)
    const [flag,setFlag]=useState(true)
        const url=process.env.REACT_APP_DEV_URL

    const handleSearch=async()=>{
        if(!search){
            getData()
        }else{
            try {
                let data=await fetch(`${url}/store/search/${search}`)
                data=await data.json()
                setOutlet(data.data)
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getData=async()=>{
        try {
            let data=await fetch(`${url}/store?page=${page}`)
            data=await data.json()
            console.log(data)
            setOutlet(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete=async(id)=>{
        try {
            let res=await fetch(`${url}/store/delete/${id}`,
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
      const getCount=async()=>{
        try {
          let data =await fetch(`${url}/store`)
          data=await data.json()
          console.log(data);
          setCount(data.data.length)
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
            <Button leftIcon={<AddIcon/>} border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/store/add")}>
                Add New
            </Button>
            <Box>
            Search:<Input w="150px" onBlur={()=>setFlag(true)}  onChange={(e)=>setSearch(e.target.value)}  value={search} onKeyUp={handleSearch} />
            </Box>
            {/* <Button border={"1px solid #cfcccc"} rightIcon={<DeleteIcon/>}>
                Bulk Delete
            </Button> */}
        </Flex>
        <br/>
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
  <Table variant='simple'>
    <TableCaption borderTop={"1px solid #161616"}>There Are {count} Store</TableCaption>
    <Thead>
      <Tr>
        <Th>#</Th>
        <Th>Store Name</Th>
        <Th >Contact</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {outlet?.map((e,i)=>{
        return <Tr >
            <Td> {i+1} </Td>
            <Td>{e.name}</Td>
            <Td>{e.contact}</Td>
            <Td>  
                <ButtonGroup>
                <Button leftIcon={<ViewIcon/>} bgColor={"#161616"} variant="solid" color="white" onClick={()=>navigate(`/admin/store/${e._id}`)}>View</Button>
                <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/store/edit/${e._id}`)}>Edit</Button>
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

export default OurOutlets