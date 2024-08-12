import { Box, Button, FormControl, FormLabel, Image, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import { useNavigate } from 'react-router-dom'

const AddBroucher = () => {
  const [name,setName]=useState("")
  const [dataUrl,setDataUrl]=useState("")
  const [image,setImage]=useState({})
  const [isLoading,setIsLoading]=useState(false)
  const toast=useToast()
  const formData=new FormData()
  // const url = "https://api.srwater.in";
  // const url = "https://api.srwater.in";

  const navigate=useNavigate()

  const uploadBroucher=async(fileName)=>{

      try {
        let data=await fetch(`${process.env.REACT_APP_DEV_URL}/broucher/add`,{
          method:"POST",
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({name,file:fileName})
        })
        data=await data.json()
        toast({
          title: "Broucher Added Successfully",
          description: data.data.msg,
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        navigate("/admin/broucher")
      } catch (error) {
        console.log(error);
        toast({
          title: "Error In Adding New File",
          description: error.message,
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      }
  }

  const handleFileChanger = async(e) => {
    let file = e.target.files[0];
    console.log(file);
    setImage(file);
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitFile = async () => {
    console.log(dataUrl);
    if(dataUrl==""){
      return 
    }
    console.log(image);
    formData.append("broucher", image);
    setIsLoading(true);
    try {
      let data = await axios.post(
        `${process.env.REACT_APP_DEV_URL}/broucher/pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.data.data);
      toast({
        title: "File Uploaded Successfully",
        description: data.data.msg,
        status: "success",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
     return data.data.data 
    } catch (error) {
      console.log(error);
      toast({
        title: "Error In Uploading File",
        description: error.message,
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <div>
       <Box
        backgroundColor={"white"}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
        padding={"20px"}
        borderRadius={"20px"}
      >
        <FormControl isRequired>
          <FormLabel>Title</FormLabel>
          <Input
            value={name}
            name="title"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <br />
        <FormControl isRequired>
          <FormLabel>File</FormLabel>
          {/* {dataUrl && <PDFViewer document={{
            url:dataUrl
          }} 
          />} */}
          <br />
          <form encType="multipart/form-data">
            <input
              required
              type="file"
              name="broucher"
              onChange={(e) => handleFileChanger(e)}
            />
          </form>
          <Text>
            <span style={{ fontWeight: "bold" }}>Note</span>:PDF File will allow Only
          </Text>
        </FormControl>
        <br />
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
          // onClick={() => submitFile().then((res)=>uploadBroucher(res))}
          onClick={()=>submitFile().then((res)=>setTimeout(()=>uploadBroucher(res),5000))}
          isDisabled={!name}
        >
          Add New
        </Button>
      </Box>
    </div>
  )
}

export default AddBroucher