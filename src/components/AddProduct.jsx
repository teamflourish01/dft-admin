import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Spinner,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {MdDelete} from "react-icons/md"
import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

const AddProduct = () => {
  // let url = "https://api.srwater.in";
  // let url="http://192.168.1.19:8000"
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    image: [],
    order: 1,
    price:""
  });
  const [dataUrl, setDataUrl] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [category, setCategory] = useState([]);
  const toast = useToast();
  const [parameters, setParameters] = useState([]);
  const [values, setValues] = useState([]);
  
  const navigate = useNavigate();

  const formData = new FormData();

  const handleParameters = (i, v) => {
    const updatedParameters = [...parameters];
    updatedParameters[i] = v;
    setParameters(updatedParameters);
  };
  const handleValues = (i, v) => {
    const updatedValues = [...values];
    updatedValues[i] = v;
    setValues(updatedValues);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChanger = (e) => {
    let file = e.target.files[0];
    console.log(file);
    // setImage(file);
    setImage([...image, file]);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        // setDataUrl(reader.result);
        setDataUrl([...dataUrl, reader.result]);
      };
      reader.readAsDataURL(file);
    }
    e.target.value=""
  };

  const handleImage=(index)=>{
    let newArr=[...dataUrl]
   newArr.splice(index,1)
      setDataUrl(newArr)
  }
  const getCategory = async () => {
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/category`);
      data = await data.json();
      setCategory(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdd = async (imageArr) => {
    let specObject = {};
    for (let i = 0; i < parameters.length; i++) {
      const parameter = parameters[i];
      const value = values[i];
      if (parameter && value) {
        specObject[parameter] = value;
      }
    }
    let dup = { ...product };
    if (imageArr?.length>0) {
      dup.image = imageArr;
    }
    if (specObject) {
      dup.specification = specObject;
    }
    try {
      let data = await fetch(`${process.env.REACT_APP_DEV_URL}/product/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dup),
      });
      data = await data.json();
      // console.log(data);
      setIsLoading(false);
      toast({
        title: "Product Added",
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
        title: "Error While Creating Account",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const submitFile = async () => {
    debugger
    if (dataUrl.length === 0) {
      return;
    }
    for (let x of image) {
      formData.append("product", x);
    }
    // formData.append("product", image);
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
      toast({
        title: "Error In Uploading Image",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    getCategory();
    console.log(dataUrl);
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
              required
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
          <FormControl>
            <FormLabel>Category</FormLabel>
            <select
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            >
              <option>Select</option>
              {category &&
                category.map((e) => <option value={e?._id}>{e.name}</option>)}
            </select>
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Order</FormLabel>
            <Input
              variant="flushed"
              type="number"
              name="order"
              value={product.order}
              onChange={(e) => handleChange(e)}
            />
          </FormControl>
          <br />
          <FormControl isRequired>
            <FormLabel>Price</FormLabel>
            <Input
              variant="flushed"
              
              name="price"
              value={product?.price}
              onChange={(e) => handleChange(e)}
            />
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
          <br />
          <Text fontWeight={"bold "}>Specifications</Text>
          <br />

          <Flex border={"1px solid #161616"} borderRadius={"20px"} p="4" px="4">
            <Box>
              <Text fontWeight={"bold "}>Parameters</Text>
              {Array.from({ length: 8 }, (_, index) => (
                <Input
                  key={index}
                  placeholder="Parameter"
                  onChange={(e) => {
                    handleParameters(index, e.target.value);
                  }}
                />
              ))}
            </Box>
            <Box>
              <Text fontWeight={"bold"} textAlign={"cednter"}>
                Values
              </Text>
              {Array.from({ length: 8 }, (_, index) => (
                <Input
                  key={index}
                  placeholder="Value"
                  onChange={(e) => {
                    handleValues(index, e.target.value);
                  }}
                />
              ))}
            </Box>
          </Flex>
        </Box>
        <Box
          backgroundColor={"white"}
          boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
          padding={"20px"}
          borderRadius={"20px"}
        >
          <FormControl isRequired>
            <FormLabel>Product Image</FormLabel>
            {dataUrl ? (
              dataUrl.map((e,i) =>{ 
                return <>
                  <Flex gap="20px">
                    <Image src={e} width="200px"/>
                    <MdDelete color="red" size={"30px"} onClick={()=>handleImage(i)}/>
                  </Flex>
                </>
              })
            ) : (
              <Image
                w="150px"
                h="150px"
                src={`${process.env.REACT_APP_DEV_URL}/product/${product?.image}`}
              />
            )}
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
          onClick={() => submitFile().then((res) => handleAdd(res))}
          isDisabled={!product.name}
        >
          Add New
        </Button>
      </center>
    </Box>
  );
};

export default AddProduct;
