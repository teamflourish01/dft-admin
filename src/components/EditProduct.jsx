import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete, MdOutlineRemoveCircle } from "react-icons/md";
import { GrFormAdd } from "react-icons/gr";
import { IoIosRemove } from "react-icons/io";

const EditProduct = () => {
  const { productid } = useParams();
  let url = process.env.REACT_APP_DEV_URL;
  // let url="http://192.168.1.12:8000"

  const [product, setProduct] = useState({});
  const [dataUrl, setDataUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const [spec, setSpec] = useState({});
  const [newParameter, setNewParameter] = useState("");
  const [newValue, setNewValue] = useState("");

  const formData = new FormData();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImage = (index) => {
    let dup=[...product.image]
     dup.splice(index, 1);
    setProduct({ ...product, image: dup });
  };

  const handleImageLocal=(index)=>{
    let dup=[...dataUrl]
    dup.splice(index, 1);
    setDataUrl(dup)
  }

  const addNewEntry = () => {
    if (newParameter && newValue) {
      setSpec((prevData) => ({
        ...prevData,
        [newParameter]: newValue,
      }));
      setNewParameter("");
      setNewValue("");
    }
  };

  const handleValueChange = (parameter, value) => {
    setSpec((prevData) => ({
      ...prevData,
      [parameter]: value,
    }));
  };
  const handleFileChanger = (e) => {
    let file = e.target.files[0];
    console.log(file);
    // setImage(file);
    setImage([...image,file])
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        // setDataUrl(reader.result);
        setDataUrl([...dataUrl,reader.result])
      };
      reader.readAsDataURL(file);
    }
  };
  const getCategory = async () => {
    try {
      let data = await fetch(`${url}/category`);
      data = await data.json();
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      let data = await fetch(`${url}/product/${productid}`);
      data = await data.json();
      // console.log(data.data);
      setProduct(data.data);
      setSpec(data.data.specification);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (imageUrl) => {
    let dup = { ...product };
    if (imageUrl) {
      dup.image = [...dup.image,...imageUrl];
    }
    
    if (spec) {
      dup.specification = spec;
    }
    try {
      let data = await fetch(`${url}/product/edit/${productid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dup),
      });
      data = await data.json();
      console.log(data);
      setIsLoading(false);
      toast({
        title: "Product has been successfully updated",
        description: data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      navigate("/admin/product");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: error.message,
        description: error,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const submitFile = async () => {
    if (dataUrl.length==0) {
      return;
    }
    for(let x of image){
    formData.append("product", x);
    }
    setIsLoading(true);
    try {
      let data = await axios.post(
        `https://api.srwater.in/product/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data.data);
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    getCategory();
    console.log(spec);
  }, []);
  return (
    <Box>
      <Flex justifyContent={"space-around"} gap="40px">
        <Box
          backgroundColor={"white"}
          w="700px"
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              variant={"flushed"}
              type="text"
              name="name"
              value={product.name}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Slug</FormLabel>
            <Input
              variant="flushed"
              type="text"
              name="slug"
              value={product.slug}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              variant="flushed"
              type="text"
              name="price"
              value={product.price}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl>
            <FormLabel>Category</FormLabel>
            <select
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option value={product.category?._id}>
                {product.category?.name}
              </option>
              {category &&
                category.map((e) => <option value={e?._id}>{e.name}</option>)}
            </select>
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea
              variant="flushed"
              name="description"
              value={product.description}
              onChange={(e) => handleChange(e)}
              maxLength={"250"}
            />
          </FormControl>
          <br />
          <Text fontWeight={"bold "}>Specifications</Text>
          <br />
          <Table>
            <Thead>
              <Tr>
                <Th>Parameter</Th>
                <Th>Value</Th>
              </Tr>
            </Thead>
            <Tbody>
              {spec &&
                Object.entries(spec).map(([parameter, value], index) => (
                  <Tr key={parameter}>
                    <Td>
                      <Input type="text" value={parameter} />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleValueChange(parameter, e.target.value)
                        }
                      />
                    </Td>
                    <Td>
                      <Button
                        onClick={() => {
                          let dup = { ...spec };
                          delete dup[parameter];
                          setSpec(dup);
                        }}
                      >
                        <IoIosRemove size="25px" />
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          <Table>
            <Thead>
              <Tr>
                <Th>Add New</Th>
                <Th>Add New</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Input
                    type="text"
                    placeholder="New Parameter"
                    value={newParameter}
                    onChange={(e) => setNewParameter(e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    placeholder="New Value"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                  />
                </Td>
                <Td>
                  <Button onClick={addNewEntry}>
                    <GrFormAdd size="25px" />
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Box></Box>
        </Box>
        <Box
          backgroundColor={"white"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Product Image</FormLabel>
            {
               dataUrl&& dataUrl?.map((e,i) =>{ 
                  return <>
                    <Flex gap="20px">
                      <Image src={e} width="200px"/>
                      <MdDelete color="red" size={"30px"} onClick={()=>handleImageLocal(i)}/>
                    </Flex>
                  </>
                })
              }
              {product?.image &&
              product.image.map((e, i) => {
                return (
                  <>
                    <Flex gap="20px">
                      <Image width="200px" src={`${url}/product/${e}`} />
                      <Box _hover={{cursor:"pointer"}}>
                      <MdDelete
                        color="red"
                        size={"30px"}
                        onClick={() => handleImage(i)}
                      />
                      </Box>
                    </Flex>
                  </>
                );
              })
            }
            <br />
            <form encType="multipart/form-data">
              <input
                required
                type="file"
                name="product"
                onChange={(e) => handleFileChanger(e)}
              />
            </form>
            <Text>
              <span style={{ fontWeight: "bold" }}>Note</span>:File Size Should
              Be Less than 500KB and 500x500px size will allow Only
            </Text>
          </FormControl>
        </Box>
      </Flex>
      <br />
      <center>
        <Button
          variant={"solid"}
          bgColor={"#161616"}
          color="white"
          _hover={{
            color: "black",
            bgColor: "white",
            border: "1px solid #161616",
          }}
          leftIcon={isLoading && <Spinner color="blue.500" />}
          onClick={() => submitFile().then((res) => handleUpdate(res))}
        >
          Save
        </Button>
      </center>
    </Box>
  );
};

export default EditProduct;
