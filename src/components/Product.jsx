import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import DeleteBtn from './DeleteBtn'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Product = () => {
    const [product,setProduct]=useState([])
    const [search,setSearch]=useState("")
    const [flag,setFlage]=useState(true)
    const [page,setPage]=useState(1)
    const navigate=useNavigate()
    let url=process.env.REACT_APP_DEV_URL
    const [count,setCount]=useState(0)

    const getCount=async()=>{
      try {
        let data =await fetch(`${url}/product`)
        data=await data.json()
        // console.log(data);
        setCount(data.data.length)
    } catch (error) {
        console.log(error);
    }
    }

    const getData=async()=>{
            try {
                let data =await fetch(`${url}/product?page=${page}`)
                data=await data.json()
                // console.log(data);
                setProduct(data.data)
            } catch (error) {
                console.log(error);
            }
    }
    const handleSearch=async()=>{

      try {
        if(search){
          let data=await fetch(`${url}/product/search/${search}`)
          data=await data.json()
          setProduct(data.data)
        }else{
          getData()
        }
      } catch (error) {
        console.log(error);
      }
    }
    const handleDelete=async(id)=>{
      try {
       
        let data=await fetch(`${url}/product/delete/${id}`,
        {
          method:"DELETE",
          headers:{
            "Content-Type": "application/json"
          },
        })
        data=await data.json()
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
            <Button leftIcon={<AddIcon/>} border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/product/add")}>
                Add New
            </Button>
            <Box>
            Search:<Input w="150px" onBlur={()=>setFlage(true)} onChange={(e)=>{setFlage(false);setSearch(e.target.value)}}  value={search} onKeyUp={handleSearch} />
            </Box>
        </Flex>
        <br/>
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
  <Table variant='simple'>
    <TableCaption borderTop={"1px solid #161616"}>There Are {count} Products</TableCaption>
    <Thead>
      <Tr>
        <Th>#</Th>
        <Th>Order</Th>
        <Th>Name</Th>
        <Th >Slug</Th>
        <Th >Category</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {product?.map((e,i)=>{
        return <Tr >
            <Td> {i+1} </Td>
            <Td>{e.order}</Td>
            <Td>{e.name}</Td>
            <Td>{e.slug}</Td>
            <Td>{e.category?.name}</Td>
            <Td>  
                <ButtonGroup>
                <Button leftIcon={<ViewIcon/>} bgColor={"#161616"} variant="solid" color="white" onClick={()=>navigate(`/admin/product/${e._id}`)}>View</Button>
                <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/product/edit/${e._id}`)}>Edit</Button>
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
          <Button variant={"outline"} border="1px solid #161616" isDisabled={page>Math.floor(count/12)} onClick={()=>setPage(page+1)}><BsArrowRight/></Button>
        </div>
        }
</Flex>
    </div>
  )
}

export default Product
