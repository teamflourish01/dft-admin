import { AddIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { Box, Button, ButtonGroup, Flex, Input, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import DeleteBtn from './DeleteBtn'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'

const CardList = () => {
    const navigate=useNavigate()
    const [card,setCard]=useState([])
    const [search,setSearch]=useState("")
    const [page,setPage]=useState(1)
    const [count,setCount]=useState(0)
    const [flag,setFlag]=useState(true)
    const toast=useToast()
    // let url="https://api.srwater.in"

    const getCount=async()=>{
        try {
          let data =await fetch(`${process.env.REACT_APP_DEV_URL}/card`)
          data=await data.json()
        //   console.log(data);
          setCount(data.data.length)
      } catch (error) {
          console.log(error);
      }
      }


    const handleSearch=async()=>{
        if(!search){
            getCard()
        }else{
            try {
                let data=await fetch(`${process.env.REACT_APP_DEV_URL}/card/search/${search}`)
                data=await data.json()
                setCard(data.data)
            } catch (error) {
                console.log(error);
            }
        }
    }



    const getCard=async()=>{
        try {
            let data=await fetch(`${process.env.REACT_APP_DEV_URL}/card?page=${page}`)
            data=await data.json()
            // console.log(data);
            setCard(data.data)
        } catch (error) {
            console.log(error);
        }
    }

const handleDelete=async(id)=>{
    try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/card/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        data=await data.json()
        toast({
            title: "Card Deleted Successfully",
            description: data.msg,
            status: "success",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          getCard()
    } catch (error) {
        toast({
            title: "Error in Deleting ",
            description: error.message,
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
    }
}
    useEffect(()=>{
        getCard()
        getCount()
    },[page])
  return (
    <div>
        <Flex gap={5} justifyContent={"space-between"}>
            <Button leftIcon={<AddIcon/>} border={"1px solid #cfcccc"} onClick={()=>navigate("/admin/card/add")}>
                Add New
            </Button>
            <Box>
            Search:<Input w="150px" onBlur={()=>setFlag(true)} onChange={(e)=>{setFlag(false);setSearch(e.target.value)}}  value={search} onKeyUp={handleSearch} />
            </Box>
        </Flex>
        <br/>
        <TableContainer border={"1px solid #161616"} borderRadius={"20px"}>
  <Table variant='simple'>
    <TableCaption borderTop={"1px solid #161616"}>There Are {count} Card Holders</TableCaption>
    <Thead>
      <Tr>
        <Th>#</Th>
        <Th>Name</Th>
        <Th>Designation</Th>
        <Th >link</Th>
        <Th >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
    {card?.map((e,i)=>{
        return <Tr >
            <Td> {i+1} </Td>
            <Td>{e.name}</Td>
            <Td>{e.designation}</Td>
            <Td>https://srwater.in/card/{e?.generated_name}</Td>
            <Td>{e.slug}</Td>
            <Td>
                <ButtonGroup>
                <Button leftIcon={<BiEditAlt/>} border="1px solid #b3abab" onClick={()=>navigate(`/admin/card/edit/${e.generated_name}`)}>Edit</Button>
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

export default CardList