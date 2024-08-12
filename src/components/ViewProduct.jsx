import { Box, Button, Flex, Image, SimpleGrid, Table, Tbody, Td, Text, Textarea, Th, Thead, Tr, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'

const ViewProduct = () => {
    const {productid}=useParams()
    const navigate=useNavigate()
    const [product,setProduct]=useState({})
    const toast=useToast()
    let url=process.env.REACT_APP_DEV_URL;
  // let url="http://192.168.1.12:8000"

    const dataArray = Object.entries(product.specification||{})

    const getData=async()=>{
            try {
                
                let data=await fetch(`${url}/product/${productid}`)
                data=await data.json()
                // console.log(data.data);
                setProduct(data.data)
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
        toast({
          title: "Product has been Deleted",
          description: data.msg,
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        navigate("/admin/product")
      } catch (error) {
        console.log(error);
      }
    }
    useEffect(()=>{
        getData()
        
    },[])
  return (
    <div>
          <Flex gap="20px" >
        <Text fontSize={"xl"} fontWeight={"semibold"}>View Product Details</Text>
        <Button
            borderRadius={"20px"}
            bgColor={"green.100"}
            _hover={{color:"green.300",bgColor:"#eef1f4"}}
          leftIcon={<BiEditAlt  />}
          onClick={() => navigate(`/admin/product/edit/${productid}`)}
        >
          Edit
        </Button>
        <Button
        borderRadius={"20px"}
        bgColor={"red.200"}
        _hover={{color:"red.300",bgColor:"#eef1f4"}}
      leftIcon={<RiDeleteBin6Line/>}
        onClick={()=>handleDelete(productid)}
        >
          Delete
        </Button>
      </Flex>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Name</Text>
      <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{product.name}</Box>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Order</Text>
      <Text padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{product.order} </Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Price</Text>
      <Text padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{product.price}</Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Slug</Text>
      <Text padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{product.slug}</Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Category</Text>
      <Text padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>{product.category?.name}</Text>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Description</Text>
      <Textarea padding="10px 20px" width="50%" bgColor={"#eef1f4"} value={product.description} fontSize={"medium"}/>
      <br />
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Image</Text>
      <SimpleGrid columns={[1,1,1,2,2]} rowGap={"9"} >
      {product?.image&&product?.image.map((e)=><Image  src={`${url}/product/${e}`}/>
      )}
      
      </SimpleGrid>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Specification</Text>
      <Table w={"50%"} bgColor={"#eef1f4"}>
      <Thead>
        <Tr>
          <Th>Parameter</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {dataArray.map(([parameter, value]) => (
          <Tr key={parameter}>
            <Td>{parameter}</Td>
            <Td>{value}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Created at</Text>
      {product.createdAt && 
       
        <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {new Date(product.createdAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
        </Box>
      }
      <br />
      <Text fontWeight={"semibold"} fontSize={"xl"}>Updated at</Text>
      {product.modifiedAt && 
       
        <Box padding="10px 20px" width="50%" bgColor={"#eef1f4"} fontSize={"medium"}>
          {new Date(product.modifiedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  })}
        </Box>
      }
    </div>
  )
}

export default ViewProduct