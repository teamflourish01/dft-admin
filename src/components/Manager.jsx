import { AddIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Switch, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const Manager = () => {
    const [search,setSearch]=useState("")
    const navigate=useNavigate()
    const [page,setPage]=useState(1)
    const [count,setCount]=useState(0)
    const [flag,setFlag]=useState(true)
    const [manager,setManager]=useState([])
    const toast=useToast()

    const getData=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/annual/manager?page=${page}`)
            data=await data.json()
            console.log(data);
            setManager(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getCount=async()=>{
        try {
          let data =await fetch(`${process.env.REACT_APP_DEV_URL}/annual/manager`)
          data=await data.json()
          console.log(data);
          setCount(data.data.length)
      } catch (error) {
          console.log(error);
      }
      }

      const handleDelete=async(id)=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/annual/manager/delete/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            data=await data.json()
         
            toast({
                title: 'Account Deleted',
                description: data.msg,
                status: 'success',
                duration: 9000,
                position:"top",
                isClosable: true,
              })
              getData()
        } catch (error) {
            toast({
                title: error.message,
                description: error.msg,
                status: 'error',
                duration: 9000,
                position:"top",
                isClosable: true,
          })
        }
      }

      const handleChange=async(element,e)=>{
        
        // console.log(!e.target.ischecked);
        // console.log(element);
        // console.log(process.env.REACT_APP_DEV_URL);
        setManager((prevManager) =>
        prevManager.map((item) =>
          item._id === element._id ? { ...item, isAuth: !item.isAuth } : item
        )
      );  
        try {
          let data=await fetch(`${process.env.REACT_APP_DEV_URL}/annual/manager/edit/${element._id}`,{
            method: 'POST',
            headers:{
              "Content-type":"application/json"
            },
            body:JSON.stringify({...element,isAuth:!element.isAuth})
          })
          data=await data.json()
        
          console.log(data);
        //  await getData()
          toast({
            title: 'Account Authorization Modified',
            description: data.msg,
            status: 'success',
            duration: 9000,
            position:"top",
            isClosable: true,
          })
        } catch (error) {
          toast({
            title: error.message,
            description: error.msg,
            status: 'error',
            duration: 9000,
            position:"top",
            isClosable: true,
      })
        }
      }

    const handleSearch=async()=>{
      try {
        if(search){
          let data=await fetch(`${process.env.REACT_APP_DEV_URL}/annual/manager/search/${search}`)
          data=await data.json()
          setManager(data.data)
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
         <Flex gap={5} justifyContent={"space-between"}>
            <Button leftIcon={<AddIcon/>} border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/annual/manager/add")}>
                Add New User
            </Button>
            <Box>
            Search:<Input w="150px" onChange={(e)=>setSearch(e.target.value)} onBlur={()=>setFlag(true)} value={search} onKeyUp={handleSearch} />
            </Box>
        </Flex>
        <br />
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
  <Table variant='simple'>
    <TableCaption borderTop={"1px solid #161616"}>There Are {count} Managers</TableCaption>
    <Thead>
      <Tr >
        <Th>#</Th>
        <Th>Userid</Th>
        <Th>Password</Th>
        <Th >Created at</Th>
        <Th >Authenticate</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    {/* Jay Shree Krishna */}
    <Tbody>
    {manager?.map((e,i)=>{
        return <Tr >
            <Td> {i+1} </Td>
            <Td>{e.name}</Td>
            <Td>{e.password}</Td>
            <Td>{e.createdAt.substring(0,10)}</Td>
            <Td>
              <Switch isChecked={e.isAuth} colorScheme='green' onChange={(event)=>handleChange(e,event)} />
            </Td>

            <Td>   
                <ButtonGroup>
                {/* <Button leftIcon={<ViewIcon/>} bgColor={"#161616"} variant="solid" color="white" onClick={()=>navigate(`/admin/view/${e._id}`)}>View</Button> */}
                {/* <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/profile/${e._id}`)}>Edit</Button> */}
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

export default Manager